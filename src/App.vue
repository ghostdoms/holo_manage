<template>
    <div class="wrap" id="app">
        <header>
            <a><img src="./assets/index_logo.png" alt=""></a>
        </header>
        <section class="content clearfix">
            <div class="lefNav">
                <ul>
                    <li v-for="i in leftNav" :class="{on:i.isActive}">
                        <router-link :to="i.path">{{i.name}}</router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </section>
        <!--add device start-->
        <div class="add" v-if="isBase">
            <header>
                <div class="logo"><img src="./assets/logo.png" alt=""></div>
            </header>
            <div class="showbox">
                <h2>DataMesh</h2>
                <h3>Please select your license</h3>
                <h3>service@datamesh.com</h3>
                <p v-if="alertInfo.length=='Wrong license，please select the correct license'">{{alertInfo}}</p>
                <form @submit.stop.prevent="addLicense">
                    <div>
                        <i>Browse...</i>
                        <input type="file" @change.stop="upload" name="file">
                    </div>
                    <input type="submit" value="Upload">
                </form>
            </div>
        </div>
        <!--add device end-->
        <!-- alert/mark start-->
        <div class="mark" v-if="isMark>=0">
            <div class="deletebox">
                <p v-if="isMark==0">Are you sure you want to delete this application?</p>
                <p v-if="isMark==1">Are you sure you want to remove this device?</p>
                <p v-if="isMark==2">Are you sure you want to uninstall this application from this device?</p>
                <p>
                    <span @click.stop.prevent="deleteDevice">Yes</span>
                    <span @click.stop.prevent="cancel">No</span>
                </p>
            </div>
        </div>
        <!-- alert/mark end-->
    </div>
</template>
<script>
import {
    path
} from './api/device-api';
export default {
    name: 'app',
    created() {
        this.$nextTick(function() {
            this.leftNav.forEach((x, i) => {
                if (location.pathname.indexOf(x.name.toLowerCase()) > -1) {
                    x.isActive = true;
                } else {
                    x.isActive = false;
                }
            })
        });
        path(this.$router);
        this.exist();
        /*license isValid*/
        // if (location.pathname.indexOf('license') < 0) {
        //     if (this.hasValid == false) {
        //         this.$router.push({
        //             path: '/license'
        //         });
        //     }
        // };

    },
    computed: {
        isBase: function() {
            return this.$store.state.license.isBase;
        },
        isMark() {
            return this.$store.state.device.isMark;
        },
        deleteId() {
            return this.$store.state.device.deleteId;
        },
        detail() {
            return this.$store.state.app.detail;
        },
        detailDevice() {
            return this.$store.state.device.detail;
        },
        deleteIdApp() {
            return this.$store.state.app.deleteIdApp;
        },
        hasValid() {
            return this.$store.state.license.hasValid;
        },
        pinType() {
            return this.$store.state.device.pinType;
        },
        alertInfo() {
            return this.$store.state.license.alertInfo;
        },
    },
    watch: {
        '$route' () {
            this.$nextTick(function() {
                this.leftNav.forEach((x, i) => {
                    if (location.pathname.indexOf(x.name.toLowerCase()) > -1) {
                        x.isActive = true;
                    } else {
                        x.isActive = false;
                    }
                })
            });
            if (location.pathname != "/device/add") {
                this.$store.state.device.pinType = 3;
            };
            this.exist();
        },
        detail() {
            return this.$store.state.app.detail;
        },
        alertInfo() {
            return this.$store.state.app.alertInfo;
        }
    },
    data() {
        return {
            isAdd: false,
            isUpload: false,
            leftNav: [{
                'name': 'Device',
                'path': '/device',
                'isActive': false,
            }, {
                'name': 'Application',
                'path': '/application',
                'isActive': false,
            }, {
                'name': 'License',
                'path': '/license',
                'isActive': false,
            }]
        }
    },
    methods: {
        upload(e) {
            var file = e.target.files[0];
            var name = file.name;
            e.target.parentNode.firstChild.innerHTML = name;
        },
        addLicense(e) {
            var formData = new FormData(e.target);
            this.$store.dispatch('addLicense', formData);
        },
        deleteDevice() { //delete
            if (location.pathname == '/device') {
                var id = this.deleteId;
                var res = {
                    id: id
                };
                this.$store.dispatch('deleteDevice', res);
            } else if (location.pathname == '/application') {
                var id = this.deleteIdApp;
                var res = {
                    id: id
                };
                this.$store.dispatch('delApp', res);
            } else if (location.pathname == '/license') {
                this.$store.dispatch('deleteLicense');
            } else if (location.pathname.indexOf('/application/more') > -1) {
                this.$store.dispatch('uninstallApp', this.detail);
            } else if (location.pathname.indexOf('/device/more') > -1) {
                this.$store.dispatch('uninstallApp', this.detailDevice);
            }
            this.$store.state.device.isMark = -1;
        },
        cancel() {
            this.$store.state.device.isMark = -1;
        },
        exist() {
            this.$store.dispatch('exist');
        },
    }
}
</script>
<style>
/* new css  */

* {
    margin: 0;
    padding: 0;
}

html,
body {
    width: 100%;
    height: 100%;
    font-family: 'LE';
}

@font-face {
    font-family: 'LE';
    src: url("/static/font/DINPRO-REGULAR.OTF");
}

.clearfix:after {
    display: block;
    content: "clear";
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
}

ul li,
ol li {
    list-style: none;
}

a {
    text-decoration: none;
}

table tr:nth-child(even) {
    background: #fcfcfc;
}

table img {
    vertical-align: middle;
    width: 20px;
    position: relative;
    left: -15px;
}

.wrap {
    width: 100%;
    height: 100%;
}


/* mark */

.add {
    width: 100%;
    height: 100%;
    background: url(/static/index_bg.png);
    background-size: cover;
    background-color: #0288d1;
    position: fixed;
    left: 0;
    top: 0;
}

.add header {
    padding: 13px 29px;
}

.showbox {
    width: 516px;
    position: fixed;
    top: 30.333%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    text-align: center;
}

.showbox p {
    text-align: left;
    padding-left: 32px;
    color: #ff5252;
}

.showbox h2 {
    font-size: 40px;
    color: #fff;
    letter-spacing: 15px;
    padding-bottom: 25px;
}

.showbox h3 {
    font-size: 28px;
    color: #fff;
    font-weight: normal;
    letter-spacing: 5px;
    padding-bottom: 15px;
}

.showbox div {
    width: 365px;
    height: 28px;
    border: 1px solid #fff;
    border-radius: 4px;
    float: left;
    margin-left: 30px;
    position: relative;
}

.showbox div i {
    position: absolute;
    left: 0;
    top: 4px;
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
    font-style: normal;
}

.showbox div input[type=file] {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    filter: alpha(opacity=0);
    /* IE */
    -moz-opacity: 0;
    /* 老版Mozilla */
    -khtml-opacity: 0;
    /* 老版Safari */
    opacity: 0;
    /* 支持opacity的浏览器*/
}

.showbox input[type=submit] {
    float: left;
    width: 72px;
    height: 29px;
    border: 1px solid #fff;
    border-radius: 4px;
    color: #fff;
    background: transparent;
    margin-left: 10px;
}


/* header */

.wrap>header {
    background: #039be5;
    height: 50px;
    width: 100%;
}

.wrap>header a {
    display: inline-block;
    width: 230px;
    height: 100%;
}

.wrap>header a img {
    width: 100%;
}


/* left nav */

.content {
    width: 100%;
    height: -moz-calc(100% - 50px);
    height: -webkit-calc(100% - 50px);
    height: calc(100% - 50px);
}

.content .lefNav {
    width: 230px;
    height: 100%;
    background: url(./assets/left_bg.png);
    background-size: cover;
    background-color: #3c3c3c;
    float: left;
    position: relative;
}

.content .lefNav li {}

.content .lefNav li a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    display: inline-block;
    // padding: 20px 0 20px 36px;
    padding: 20px 0;
    width: 100%;
    text-indent: 36px;
}

.content .lefNav li a:hover {
    background: #2d2d2d;
}

.content .lefNav li.on {
    background: #252525;
}

.content .container {
    float: right;
    width: -moz-calc(100% - 230px);
    width: -webkit-calc(100% - 230px);
    width: calc(100% - 230px);
    height: 100%;
}


/* alert */

.mark {
    position: fixed;
    left: 0;
    top: 50px;
    width: 100%;
    height: -moz-calc(100% - 50px);
    height: -webkit-calc(100% - 50px);
    height: calc(100% - 50px);
    background: rgba(0, 0, 0, 0.5);
}

.mark .deletebox {
    width: 400px;
    height: 171px;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}

.deletebox p:nth-child(1) {
    padding-top: 38px;
    font-size: 20px;
    color: #666;
    width: 82%;
    margin-left: 9%;
    line-height: 1.5;
}

.deletebox p:nth-child(2) {
    padding-top: 26px;
    font-size: 20px;
    color: #666;
    width: 66%;
    margin-left: 17%;
    line-height: 1.5;
}

.deletebox span {
    width: 68px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    display: inline-block;
    cursor: pointer;
}

.deletebox span:nth-child(1) {
    float: left;
    background: #31a9e6;
    border: 1px solid #31a9e6;
    color: #fff;
}

.deletebox span:nth-child(1):hover {
    background: #039be5;
}

.deletebox span:nth-child(2) {
    float: right;
    background: #fafafa;
    color: #fff;
    border: 1px solid #e1e1e1;
    color: #666;
}

.deletebox span:nth-child(2):hover {
    background: #03a9f4;
    color: #fff;
}
</style>
