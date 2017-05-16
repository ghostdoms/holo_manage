<template>
    <div class="moreApp">
        <p>You can now manage this application on devices below</p>
        <table cellspacing="0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>IP address</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i,index) in listDetail">
                    <td>{{i.id}}</td>
                    <td>{{i.appInfo.appName}}</td>
                    <td>{{i.ip}}</td>
                    <td>{{i.appInfo.appState=='In Operatioin'?'active':i.appInfo.appState}}</td>
                    <td class="mgt">
                        <div v-if="i.appInfo.appState=='In Operatioin'">
                            <div>
                                <span class="stop" @click.stop="stopApp(i.appInfo.appDetail,i.id)">Stop</span>
                                <span class="restart" @click.stop="restartApp(i.appInfo.appDetail,i.id)">Restart</span>
                            </div>
                        </div>
                        <div v-if="i.appInfo.appState=='Installed'">
                            <div>
                                <span class="start" @click.stop="startApp(i.appInfo.appDetail,i.id)">Start</span>
                                <span class="config" @click.stop="config(index,$event,i.appInfo.appDetail)">Configure</span>
                                <span class="update" @click.stop="updateApp(i.appInfo.appDetail,i.id,i.appInfo.appName)">Update</span>
                            </div>
                            <span class="uninstall" @click.stop="uninstallApp(i.appInfo.appDetail,i.id)">Uninstall</span>
                        </div>
                        <div v-if="i.appInfo.appState=='Not Installed'">
                            <div>
                                <span class="install" @click.stop="installApp(i.id)">Install</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-if="!listDetail || listDetail.length==0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td class="mgt">-</td>
                </tr>
            </tbody>
        </table>
        <div class="ip" v-if="isConfig">
            <p>Input your server IP address:</p>
            <label for="">
                <input type="text" placeholder="IP Adress" v-model="confIp"><span @click.stop.prevent="configIp">ok</span>
            </label>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'update',
    created() {
        var self = this;
        self.init();
        document.onclick = function(e) {
            var e = e || window.event;
            if (e.target.className !== 'ip' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'P') {
                self.isConfig = false;
                self.alertType = 'err';
            }
        };
    },
    mounted() {

    },
    computed: {
        isBase() {
            return this.$store.state.app.isBase;
        },
        listDetail() {
            return this.$store.state.app.listDetail;
        },
        alertType() {
            return this.$store.state.app.alertType;
        },
        alertInfo() {
            return this.$store.state.app.alertInfo;
        },
        initNo() {
            return this.$store.state.app.initNo;
        },
        detail() {
            return this.$store.state.app.detail;
        },
    },
    watch: {
        listDetail() {
            return this.$store.state.app.listDetail;
        },
        '$route' () {
            this.init();
        }
    },
    data() {
        return {
            id: '',
            isConfig: false,
            isSucc: false,
            isErr: false,
            confIp: '',
            detail: '',
        }
    },
    methods: {
        init() {
            this.id = this.$route.params.id;
            this.appDetailList();
        },
        appDetailList() {
            var res = {
                appId: this.id,
            };
            this.$store.dispatch('appDetailList', res);
        },
        installApp(id) {
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var self = this;
                var res = {
                    device_id: id,
                    app_id: self.id
                };
                this.$store.dispatch('installApp', res);
            }
        },
        updateApp(detail, id, name) {
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: id,
                    PackageFullName: detail.PackageFullName,
                    appName: name
                };
                this.$store.dispatch('updateApp', res);
            }

        },
        restartApp(detail, id) {
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: id,
                    PackageFullName: detail.PackageFullName,
                    PackageRelativeId: detail.PackageRelativeId
                };
                this.$store.dispatch('restartApp', res);
            }

        },
        startApp(detail, id) {
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: id,
                    PackageRelativeId: detail.PackageRelativeId
                };
                this.$store.dispatch('startApp', res);
            }

        },
        stopApp(detail, id) {
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: id,
                    PackageFullName: detail.PackageFullName
                };
                this.$store.dispatch('stopApp', res);
            }

        },
        uninstallApp(detail, id) {
            this.$store.state.device.isMark = 2;
            this.$store.state.app.initNo = 1;
            var detail = JSON.parse(detail);
            var self = this;
            var res = {
                id: id,
                PackageFullName: detail.PackageFullName
            };
            self.$store.state.app.detail = res;
        },
        config(index, e, appDetail) {
            this.isConfig = true;
            this.detail = appDetail;
            var top = e.target.parentNode.parentNode.parentNode.offsetTop;
            var left = e.target.parentNode.parentNode.parentNode.offsetLeft;
            this.$nextTick(function() {
                document.querySelector('.ip').style.cssText = 'left:' + (left - 60) + 'px;top:' + (top + 50) + 'px';
            });
        },
        configIp() {
            var self = this;
            var reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
            self.isConfig = false;
            console.log(self.confIp.match(reg))
            if (self.confIp.match(reg) == null) {
                self.$store.state.app.alertType = 'err';
                self.$store.state.app.alertInfo = 'IP is illegal';
                setTimeout(function() {
                    self.$store.state.app.alertType = '';
                })
            } else {
                var detail = JSON.parse(self.detail);
                var res = {
                    ip: self.confIp,
                    device_id: self.id,
                    packagefullname: detail.PackageFullName,
                };
                self.$store.dispatch('configIp', res);
                self.confIp = '';
            };
        },
    }
}
</script>
<style type="text/css" scoped>
/* more app */

.moreApp {
    /*padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);*/
    height: 100%;
    overflow: hidden;
}

.moreApp>p {
    font-size: 18px;
    color: #666;
    padding-bottom: 40px;
}

.moreApp table {
    width: 100%;
}

.moreApp table th,
.moreApp table td {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    font-size: 16px;
}

.moreApp table .failed {
    color: #ff5252;
}

.moreApp table th:nth-child(1) {
    width: 10%;
}

.moreApp table th:nth-child(2),
.moreApp table th:nth-child(3),
.moreApp table th:nth-child(4) {
    width: 12%;
}

.moreApp table th:nth-child(5) {
    text-align: left;
    text-indent: 105px;
}

.moreApp table td:nth-child(1),
.moreApp table td:nth-child(2),
.moreApp table td:nth-child(3),
.moreApp table td:nth-child(4) {
    text-align: center;
}

.moreApp table td:nth-child(5) {
    padding-left: 25px;
}

.moreApp table td.mgt {
    position: relative;
}

.moreApp table td.mgt div {
    display: inline-block;
    float: left;
    width: 305px;
}

.moreApp table td.mgt span {
    display: inline-block;
    padding: 2px 15px;
    background: #eee;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    margin-right: 10px;
    font-size: 16px;
    color: #444;
    cursor: pointer;
}

.moreApp table td.mgt span.install {
    padding: 2px 0;
    width: 276px;
    text-align: center;
}

.moreApp table td.mgt span.uninstall {
    position: absolute;
    right: 38px;
    top: 50%;
    margin-top: -14px;
}

.moreApp table td.mgt span:hover {
    background: #dcdcdc;
    border: 1px solid #dcdcdc;
}

.ip {
    position: fixed;
    padding: 28px 30px 39px 30px;
    left: 0;
    top: 0;
    background: #fff;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    box-shadow: 0 0 10px rgba(4, 0, 0, .16);
    -webkit-box-shadow: 0 0 10px rgba(4, 0, 0, .16);
}

.ip p {
    padding-bottom: 30px;
    font-size: 16px;
    color: #666;
}

.ip input {
    width: 290px;
    height: 28px;
    border: 1px solid #e1e1e1;
    outline: none;
    margin-right: 12px;
    text-indent: 10px;
}

.ip span {
    display: inline-block;
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    background: #31a9e6;
    border: 1px solid #31a9e6;
    color: #fff;
    position: relative;
    top: 2px;
}

.ip span:hover {
    background: #039be5;
}
</style>
