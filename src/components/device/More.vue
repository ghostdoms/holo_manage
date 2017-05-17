<template>
    <div class="moreDevice">
        <div class="succ" v-if="alertType=='succ'"><img src="../../assets/succ.png" alt="">{{alertInfo}}</div>
        <div class="err" v-if="alertType=='err'"><img src="../../assets/error.png" alt="">{{alertInfo}}</div>
        <p>Applications you have uploaded in the system</p>
        <table cellspacing="0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Application</th>
                    <th>Version</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i,index) in getAppData">
                    <td>{{i.AppId}}</td>
                    <td>{{i.appName}}</td>
                    <td>{{i.version}}</td>
                    <td>{{i.state=='In Operatioin'?'active':i.state}}</td>
                    <td class="mgt">
                        <div v-if="i.state=='In Operatioin'">
                            <div>
                                <span class="stop" @click.stop="stopApp(i.detail)">Stop</span>
                                <span class="restart" @click.stop="restartApp(i.detail)">Restart</span>
                            </div>
                        </div>
                        <div v-if="i.state=='Installed'">
                            <div>
                                <span class="start" @click.stop="startApp(i.detail)">Start</span>
                                <span class="config" @click.stop="config(index,$event,i.detail)">Configure</span>
                                <span class="update" @click.stop="updateApp(i.detail,i.appName)">Update</span>
                            </div>
                            <span class="uninstall" @click.stop="uninstallApp(i.detail)">Uninstall</span>
                        </div>
                        <div v-if="i.state=='Not Installed'">
                            <div>
                                <span class="install" @click.stop="installApp(i.AppId)">Install</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-if="!getAppData || getAppData.length==0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="ip" v-if="isConfig">
            <p>Input your server IP address:</p>
            <label for="">
                <input type="text" placeholder="IP Adress" v-model="confIp"> <span @click.stop.prevent="configIp">ok</span>
            </label>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'status',
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
    computed: {
        isBase: function() {
            return this.$store.state.license.isBase;
        },
        isCommon() { //删除弹框
            return this.$store.state.device.isCommon;
        },
        getAppData() { //删除id
            return this.$store.state.app.getAppData;
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
    },
    watch: {
        '$route' () {
            this.init();
        }
    },
    data() {
        return {
            msg: 'status',
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
            this.deviceAppListIp();
        },
        deviceAppListIp() {
            var self = this;
            var res = {
                id: self.id,
            };
            this.$store.dispatch('deviceAppListIp', res);
        },
        installApp(id) {
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var self = this;
                var res = {
                    device_id: self.id,
                    app_id: id
                };
                this.$store.dispatch('installApp', res);
            }

        },
        updateApp(detail, name) {
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: self.id,
                    PackageFullName: detail.PackageFullName,
                    appName: name
                }
                this.$store.dispatch('updateApp', res);
            }

        },
        restartApp(detail) {
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: self.id,
                    PackageFullName: detail.PackageFullName,
                    PackageRelativeId: detail.PackageRelativeId
                };
                this.$store.dispatch('restartApp', res);
            }

        },
        startApp(detail) {
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: self.id,
                    PackageRelativeId: detail.PackageRelativeId
                };
                this.$store.dispatch('startApp', res);
            }

        },
        stopApp(detail) {
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var detail = JSON.parse(detail);
                var self = this;
                var res = {
                    id: self.id,
                    PackageFullName: detail.PackageFullName
                };
                this.$store.dispatch('stopApp', res);
            }

        },
        uninstallApp(detail) {
            this.$store.state.device.isMark = 2;
            this.$store.state.device.initNo = 1;
            var detail = JSON.parse(detail);
            var self = this;
            var res = {
                id: self.id,
                PackageFullName: detail.PackageFullName
            };
            console.log(res);
            self.$store.state.app.detail = res;
        },
        config(index, e, detail) {
            this.isConfig = true;
            this.detail = detail;
            var top = e.target.parentNode.parentNode.parentNode.offsetTop;
            var left = e.target.parentNode.parentNode.parentNode.offsetLeft;
            this.$nextTick(function() {
                document.querySelectorAll('.ip')[0].style.cssText = 'left:' + (left - 60) + 'px;top:' + (top + 50) + 'px';
            });
        },
        configIp() {
            var self = this;
            var reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
            self.isConfig = false;
            if (self.confIp.match(reg) == null) {
                self.$store.state.device.alertType = 'err';
                self.$store.state.device.alertInfo = 'IP is illegal';
                setTimeout(function() {
                    self.$store.state.device.alertType = '';
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
            }
        },
    }
}
</script>
<style type="text/css" scoped>
/* more device */

.moreDevice {
    /*padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);*/
    height: 100%;
    overflow: hidden;
}

.moreDevice>p {
    font-size: 18px;
    color: #666;
    padding-bottom: 40px;
}

.moreDevice table {
    width: 100%;
}

.moreDevice table th,
.moreDevice table td {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    font-size: 16px;
}

.moreDevice table .failed {
    color: #ff5252;
}

.moreDevice table th:nth-child(1) {
    width: 10%;
}

.moreDevice table th:nth-child(2),
.moreDevice table th:nth-child(3),
.moreDevice table th:nth-child(4) {
    width: 12%;
}

.moreDevice table td:nth-child(1),
.moreDevice table td:nth-child(2),
.moreDevice table td:nth-child(3),
.moreDevice table td:nth-child(4) {
    text-align: center;
}

.moreDevice table td:nth-child(5) {
    padding-left: 25px;
}

.moreDevice table td.mgt {
    position: relative;
}

.moreDevice table td.mgt div {
    display: inline-block;
    float: left;
    width: 305px;
}

.moreDevice table td.mgt span {
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

.moreDevice table td.mgt span.install {
    padding: 2px 0;
    width: 276px;
    text-align: center;
}

.moreDevice table td.mgt span.uninstall {
    position: absolute;
    right: 38px;
    top: 50%;
    margin-top: -14px;
}

.moreDevice table td.mgt span:hover {
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
