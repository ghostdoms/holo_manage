<template>
    <div class="addDevice">
        <div class="clearfix">
            <a>You should first enable developer mode and device portal on your hololens.</a>
            <span>
                            <i>?</i>
                            <div>
                                <ul>
                                    <li>1.Power on your HoloLens and put on the device.</li>
                                <li>2.Perform the bloom gesture to launch the main menu.</li>
                                <li>
                                    <p>3.Gaze at the Settings tile and perform the air-tap </p>
                                    <p>gesture. Perform a second air-tap to place the app</p>
                                    <p>in your environment. The Settings app will launch after</p>
                                    <p>you place it.</p>
                                </li>
                                <li>4.Select the Update menu item.</li>
                                <li>5.Select the For developers menu item.</li>
                                <li>6.Enable Developer Mode.</li>
                                <li>7.Scroll down and enable Device Portal.</li>
                                </ul>
                            </div>
                        </span>
        </div>
        <div class="clearfix">
            <a>Then connecting over Wi-Fi and input your IP address.</a>
            <span>
                            <i>?</i>
                            <div>
                                <ul>
                                    <li>1.Connect your HoloLens to Wi-Fi.
                                        <p>2.Look up your device's IP address.</p>
                                        <p>Find the IP address on the device under</p> 
                                        <p>Settings > Network & Internet > Wi-Fi >  Advanced</p> 
                                        <p>Options.</p>
                                    </li>
                                    <li></li>
                                    <li>3.Input the IP address</li>
                                </ul>
                            </div>
                        </span>
        </div>
        <form @submit.stop.prevent="pairDevice" enctype="application/x-www-form-urlencoded" method="post">
            <em v-if="isIp">IP is illegal</em>
            <input type="text" placeholder="IP address" v-model="ip">
            <button @click.stop.prevent="startPairDevice">Next</button>
            <p class="info" v-if="firstType">Click or tap Request pin and look at the HoloLens display to get the generated PIN.
            </p>
            <p v-if="firstType">Enter the PIN in the PIN displayed on your device textbox.</p>
            <input type="text" placeholder="PIN" v-model="pin" v-if="firstType">
            <p v-if="firstType">New user name:</p>
            <input type="text" v-model="user" v-if="firstType">
            <p v-if="firstType">New password:</p>
            <input type="password" v-model="pwd" v-if="firstType">
            <p v-if="firstType">Confirm password:<i v-if="isPwd">{{errInfo}}</i></p>
            <input type="password" v-model="secPwd" v-if="firstType">
            <button type="submit" v-if="firstType">Pair</button>
        </form>
        <form @submit.stop.prevent="addDevice" v-if="secType">
            <p>Please input your username and password:</p>
            <p>User name:</p>
            <input type="text" v-model="user">
            <p>Password:</p>
            <input type="password" v-model="pwd">
            <button type="submit">Pair</button>
            <br>
            <span><a @click.syop.prevent="tabType">Forget your account?</a></span>
        </form>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'adds',
    created() {
        this.init();
        if (this.pinType === 0) {
            this.secType = true;
            this.firstType = false;
        } else if (this.pinType === 1) {
            this.secType = false;
            this.firstType = true;
        } else {
            this.secType = false;
            this.firstType = false;
        }
    },
    computed: {
        isBase: function() {
            return this.$store.state.license.isBase;
        },
        pinType() {
            return this.$store.state.device.pinType;
        },
        initNo() {
            return this.$store.state.device.initNo;
        },
    },
    mounted() {

    },
    watch: {
        pinType() {
            if (this.pinType == 0) {
                this.secType = true;
                this.firstType = false;
            } else if (this.pinType == 1) {
                this.secType = false;
                this.firstType = true;
            } else {
                this.secType = false;
                this.firstType = false;
            }
        },
        '$route' () {

        }
    },
    data() {
        return {
            ip: '',
            pin: '',
            user: '',
            pwd: '',
            secPwd: '',
            isPwd: false,
            firstType: false,
            secType: false,
            isIp: false,
            errInfo: ''
        }
    },
    methods: {
        init() {
          //  this.$store.state.device.isBase = false;
        },
        startPairDevice() {
            var self = this;
            var reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
            if (self.ip.match(reg) == null) { //格式不正确
                self.isIp = true;
                self.secType = false;
                self.firstType = false;
                setTimeout(function() {
                    self.isIp = false;
                }, 3000);
            } else {                
                if (this.initNo == 0) {
                    this.$store.state.device.initNo = 1;
                    var res = {
                        ip: self.ip,
                    };
                    self.$store.dispatch('startPairDevice', res);
                }

            }
        },
        pairDevice() {
            var self = this;
            if (self.pwd == self.secPwd) {
                if (self.secPwd.length >= 7 && self.secPwd.length <= 18) {
                    self.isPwd = false;
                    var res = {
                        pin: self.pin,
                        username: self.user,
                        password: self.pwd,
                        ip: self.ip
                    };
                    self.$store.dispatch('pairDevice', res);
                } else {
                    self.isPwd = true;
                    self.errInfo = 'Password must be at least 7 characters.';
                }
            } else {
                self.isPwd = true;
                self.errInfo = 'passwords are inconsistent.';
            }
        },
        addDevice() {
            var self = this;
            var res = {
                ip: self.ip,
                username: self.user,
                password: self.pwd,
            };
            this.$store.dispatch('addDevice', res);
        },
        tabType() {
            this.firstType = true;
            this.secType = false;
        }
    }
}
</script>
<style type="text/css" scoped>
/* addDevice */

.addDevice {
    /*padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);*/
    height: 100%;
    overflow: hidden;
}

.addDevice div {
    padding-bottom: 30px;
}

.addDevice div a {
    font-size: 18px;
    font-weight: bold;
    color: #444;
    display: inline-block;
    float: left;
}

.addDevice div span {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.addDevice div span i {
    position: absolute;
    left: 8px;
    top: 3px;
    width: 100%;
    height: 100%;
    background: #bbb;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    color: #fff;
    font-style: normal;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
}

.addDevice div span div {
    position: absolute;
    left: 42px;
    top: -14px;
    padding: 10px 15px;
    border: 1px solid #e1e1e1;
    display: inline-block;
    display: none;
    z-index: 2;
    background: #fff;
}

.addDevice div span:hover div {
    display: block;
}

.addDevice div span div:before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 15px;
    height: 15px;
    border-top: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    left: -9px;
    top: 15px;
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
    background: #fff;
}

.addDevice div span li {
    font-size: 16px;
    color: #444;
    line-height: 1.5;
    white-space: nowrap;
}

.addDevice input {
    width: 364px;
    height: 28px;
    border: 1px solid #e1e1e1;
    outline: none;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    text-indent: 10px;
    margin-bottom: 13px;
}

.addDevice form em {
    display: block;
    font-style: normal;
    color: #ff5252;
    font-size: 16px;
    padding-bottom: 5px;
}

.addDevice form p {
    font-size: 16px;
    color: #444;
    padding-bottom: 10px;
}

.addDevice form p i {
    font-size: 16px;
    color: #ff5252;
    font-style: normal;
    padding-left: 5px;
}

.addDevice form p.info {
    padding-bottom: 15px;
}

.addDevice form button {
    width: 60px;
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

.addDevice form a {
    font-size: 16px;
    color: #03a9f4;
    cursor: pointer;
}
</style>
