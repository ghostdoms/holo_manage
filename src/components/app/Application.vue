<template>
    <div class="app">
        <router-view></router-view>
        <div class="succ" v-if="alertType=='succ'"><img src="../../assets/succ.png" alt="">{{alertInfo}}</div>
        <div class="err" v-if="alertType=='err'"><img src="../../assets/error.png" alt="">{{alertInfo}}</div>
        <p class="clearfix" v-if="isNeed">
            <i>You can upload your packaged application to this platform to deploy to your various devices easily and manage your application better.</i> <span @click="goAdd">Add Application</span></p>
        <p v-if="isNeed">applications in the system</p>
        <table v-if="isNeed" cellspacing="0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Application</th>
                    <th>Version</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in appListData">
                    <td>{{i.AppId}}</td>
                    <td>{{i.appName}}</td>
                    <td>{{i.version}}</td>
                    <td class="mgt">
                        <div>
                            <span class="more" @click="goMore(i.AppId)">More</span>
                            <span class="update" @click.stop="goUpload(i.AppId)">Update</span>
                        </div>
                        <span class="delete" @click.stop.prevent="deleteAlert(i.AppId)">Delete</span>
                    </td>
                </tr>
                <tr v-if="!appListData || appListData.length==0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script type="text/javascript">
import {base} from '../../router/index';
export default {
    name: 'app',
    created() {
        this.getDetail();
        if (location.pathname == '/application') {
            this.isNeed = true;
        } else {
            this.isNeed = false;
        };
    },
    computed: {
        isBase: function() {
            return this.$store.state.license.isBase;
        },
        appListData() {
            return this.$store.state.app.appListData;
        },
        deleteIdApp() {
            return this.$store.state.app.deleteIdApp;
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
            if (location.pathname == '/application') {
                this.isNeed = true;
                this.getDetail();
            } else {
                this.isNeed = false;
            }; 
        },
        initNo(){
             return this.$store.state.app.initNo;
        },
        isBase: function() {
            return this.$store.state.license.isBase;
        },
    },
    data() {
        return {
            isNeed: false
        }
    },
    methods: {
        getDetail() {
            this.$store.dispatch('getAppList');
        },
        goAdd() {
            this.$router.push({
                path: base()+'/application/add'
            });
        },
        goMore(id) {
            this.$router.push({
                path: base()+'/application/more/' + id
            });
        },
        goUpload(id) {
            this.$router.push({
                path: base()+'/application/add'
            });
        },
        deleteAlert(id) { //deleteAlert
            this.$store.state.device.isMark = 1;
            this.$store.state.app.deleteIdApp = id;
        },
    }
}
</script>
<style type="text/css" scoped>
/* app */

.app {
    padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);
    overflow: hidden;
}

.app>p {
    font-size: 18px;
    color: #666;
    padding-bottom: 40px;
    position: relative;
}

.app>p i {
    display: inline-block;
    font-style: normal;
    width: -moz-calc(100% - 140px);
    width: -webkit-calc(100% - 140px);
    width: calc(100% - 140px);
    line-height: 1.5;
}

.app>p span {
    display: inline-block;
    position: absolute;
    right: 0;
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

.app>p span:hover {
    background: #039be5;
}

.app table {
    width: 100%;
}

.app table th,
.app table td {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    font-size: 16px;
}

.app table .failed {
    color: #ff5252;
}

.app table th:nth-child(1) {
    width: 10%;
}

.app table th:nth-child(2),
.app table th:nth-child(3) {
    width: 12%;
}

.app table th:nth-child(4) {
    text-align: left;
    text-indent: 60px;
}

.app table td:nth-child(1),
.app table td:nth-child(2),
.app table td:nth-child(3) {
    text-align: center;
}

.app table td:nth-child(4){
     padding-left: 25px;
}

.app table td.mgt {
    position: relative;
}

.app table td.mgt div {
    display: inline-block;
    float: left;
    width: 305px;
}

.app table td.mgt span {
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

.app table td.mgt span.error {
    background: #c6c6c6;
    border: 1px solid #c6c6c6;
}

.app table td.mgt span.delete {
    position: absolute;
    right: 38px;
    top: 50%;
    margin-top: -14px;
}

.app table td.mgt span:hover {
    background: #dcdcdc;
    border: 1px solid #dcdcdc;
}

.app table td.mgt span.error:hover {
    background: #c6c6c6;
    border: 1px solid #c6c6c6;
}
</style>
