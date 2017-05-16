<template>
    <div class="device">
        <router-view></router-view>
        <div class="succ" v-if="alertType=='succ'"><img src="../../assets/succ.png" alt="">{{alertInfo}}</div>
        <div class="err" v-if="alertType=='err'"><img src="../../assets/error.png" alt="">{{alertInfo}}</div>
        <p v-if="isNeed && !max">You now have <i>{{deviceCount || '-'}} of {{userCount || '-'}}</i> devices added to system <span @click="goAddDevice">Add device</span></p>
        <p v-if="isNeed && max">You have reached the limit for the number of devices, please upgrade your license or remove an existing device.</p>
        <table v-if="isNeed" cellspacing="0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Device</th>
                    <th>IP address</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in getListData">
                    <td><img src="../../assets/loading.gif" alt="" v-if="loading">{{i.id}}</td>
                    <td>{{i.deviceName}}</td>
                    <td>{{i.ip}}</td>
                    <td :class="{failed:i.status=='Disconnected'}">{{i.status=='Disconnected'?'Connection failed':i.status=='Not Online'?'Offline':i.status}}</td>
                    <td class="mgt">
                        <div v-if="i.status=='Online'">
                            <div>
                                <span class="more" @click="goMoreDevice(i.id)">More</span>
                                <span class="shut-down" @click.stop.prevent="shutdownDevice(i.id)">Shut down</span>
                                <span class="restart" @click.stop.prevent="restartDevice(i.id)">Restart</span>
                            </div>
                            <span class="delete" @click.stop.prevent="deleteAlert(i.id)">Delete</span>
                        </div>
                        <div v-if="i.status=='Not Online'">
                            <div>
                                <span class="more error">More</span>
                                <span class="shut-down error">Shut down</span>
                                <span class="restart error">Restart</span>
                            </div>
                            <span class="delete" @click.stop.prevent="deleteAlert(i.id)">Delete</span>
                        </div>
                        <div v-if="i.status=='Disconnected'">
                            <div>
                                <p class="failed">If you have modified the account of your device , please remove the device and add it again.</p>
                            </div>
                            <span class="delete">Delete</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="!getListData || getListData.length==0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td class="mgt"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script type="text/javascript">
import Alert from '../alert';
import {base} from '../../router/index';
export default {
    name: 'device',
    created() {
        var self = this;
        self.init();
        var timer = null;

        if (self.isBase == false) {
           // clearInterval(timer);
            self.timer = setInterval(()=> {
                if (location.pathname == '/device') {
                    self.getDeviceList();
                    self.isNeed = true;
                };
            }, 15000);
        };
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    computed: {
        isBase() { //引导页显示
            return this.$store.state.license.isBase;
        },
        isMark() { //删除弹框
            return this.$store.state.device.isMark;
        },
        loading() {
            return this.$store.state.device.loading;
        },
        isCommon() { //
            if (location.pathname.indexOf('add') > -1) {
                return !this.$store.state.device.isCommon;
            } else {
                return this.$store.state.device.isCommon;
            };
        },
        getListData() { //获取列表
            return this.$store.state.device.getListData;
        },
        deleteId() { //删除id
            return this.$store.state.device.deleteId;
        },
        deviceCount() {
            return this.$store.state.device.deviceCount;
        },
        alertType() {
            return this.$store.state.device.alertType;
        },
        alertInfo() {
            return this.$store.state.device.alertInfo;
        },
        initNo() {
            return this.$store.state.device.initNo;
        },
        userCount() {
            return this.$store.state.license.userCount;
        },
    },
    watch: {
        userCount() {
            return this.$store.state.license.userCount;
        },
        loading() {
            return this.$store.state.device.loading;
        },
        isBase() {
            this.init();
        },
        '$route' () {
            this.init();
        }
    },
    data() {
        return {
            isNeed: true,
            isSucc: false,
            isErr: false,
            deviceNo: '',
            max: false,
            timer:null,
        }
    },
    methods: {
        init() {
            if (this.isBase == false) {
                if (location.pathname == '/device') {
                    this.getDeviceList();
                    this.getDeviceDefaultList();
                    this.licensenfo();
                    this.isNeed = true;
                } else {
                    this.isNeed = false;
                };
            };
        },
        getDeviceList() { //list
            this.$store.dispatch('getDeviceList');
        },
        getDeviceDefaultList() { //default list
            this.$store.dispatch('getDeviceDefaultList');
        },
        goMoreDevice(id) { //go more
            this.$router.push({
                path: base()+'/device/more/' + id
            });
            this.$store.state.device.deleteId = id;
        },
        goAddDevice() { //go add
            this.deviceNo = this.deviceCount;
            if (this.deviceNo >= this.userCount) {
                this.max = true;
            } else {
                this.$router.push({
                    path: base()+'/device/add'
                });
            };
        },
        deleteAlert(id) { //deleteAlert
            this.$store.state.device.isMark = 1;
            this.$store.state.device.deleteId = id;
        },
        restartDevice(id) { //restart
            if (this.initNo == 0) {
                this.$store.state.device.initNo = 1;
                var res = {
                    id: id
                };
                this.$store.dispatch('restartDevice', res);
            }

        },
        shutdownDevice(id) { //shutr dowm
            var res = {
                id: id
            };
            this.$store.dispatch('shutdownDevice', res);
        },
        licensenfo() { //licensenfo
            this.$store.dispatch('licensenfo');
        },

    },
    component: {
        Alert
    }
}
</script>
<style type="text/css" scoped>
/* device */

.device {
    padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);
    overflow: hidden;
}

.device>p {
    font-size: 18px;
    color: #666;
    padding-bottom: 40px;
}

.device>p i {
    font-style: normal;
    color: #ff5252;
}

.device>p span {
    display: inline-block;
    float: right;
    padding: 0 17px;
    height: 30px;
    background: #03a9f4;
    color: #fff;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    margin-left: 10px;
    border: none;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
}

.device>p span:hover {
    background: #039be5;
}

.device table {
    width: 100%;
}

.device table th,
.device table td {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    font-size: 16px;
}

.device table .failed {
    color: #ff5252;
}

.device table th:nth-child(1) {
    width: 10%;
}

.device table th:nth-child(2),
.device table th:nth-child(3),
.device table th:nth-child(4) {
    width: 12%;
}

.device table th:nth-child(5) {
    text-align: left;
    text-indent: 112px;
}

.device table td:nth-child(1),
.device table td:nth-child(2),
.device table td:nth-child(3),
.device table td:nth-child(4) {
    text-align: center;
}

.device table td:nth-child(5) {
    padding-left: 25px;
}

.device table td.mgt {
    position: relative;
}

.device table td.mgt div {
    display: inline-block;
    float: left;
    width: 305px;
}

.device table td.mgt span {
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

.device table td.mgt span.error {
    background: #c6c6c6;
    border: 1px solid #c6c6c6;
}

.device table td.mgt span.delete {
    position: absolute;
    right: 38px;
    top: 50%;
    margin-top: -14px;
}

.device table td.mgt span:hover {
    background: #dcdcdc;
    border: 1px solid #dcdcdc;
}

.device table td.mgt span.error:hover {
    background: #c6c6c6;
    border: 1px solid #c6c6c6;
}
</style>
