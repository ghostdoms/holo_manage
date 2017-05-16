<template>
    <div class="licence">
        <div class="succ" v-if="alertType=='succ'"><img src="../../assets/succ.png" alt="">{{alertInfo}}</div>
        <div class="err" v-if="alertType=='err'"><img src="../../assets/error.png" alt="">{{alertInfo}}</div>
        <p class="clearfix" v-if="!hasValid">
            <i>Sorry, your trial has expired, please  <em>contact us</em>  to upgrade your license. If you have got the latest license，please.</i><span>Update license</span></p>
        <p class="clearfix" v-if="hasValid">
            <i class="old-i">License information</i> <span class="old" @click.stop="del">Delete</span><span class="old"><form action="" @submit.stop.prevent="addLicense"><input name="file" type="file" @change.stop="auto"><button type="submit"></button></form>Update</span></p>
        <table>
            <tbody>
                <tr>
                    <td>Company</td>
                    <td>{{info.company || '-'}}</td>
                </tr>
                <tr>
                    <td>Trial time</td>
                    <td>{{info.trial_time || '-'}}</td>
                </tr>
                <tr>
                    <td>Device</td>
                    <td class="alert">{{info.device || '-'}} Hololens</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'license',
    created() {
        this.licensenfo();
    },
    computed: {
        isBase() {
            return this.$store.state.license.isBase;
        },
        hasValid() {
            return this.$store.state.license.hasValid;
        },
        info() {
            return this.$store.state.license.info;
        },
        alertType() {
            return this.$store.state.license.alertType;
        },
        alertInfo() {
            return this.$store.state.license.alertInfo;
        },
        initNo() {
            return this.$store.state.license.initNo;
        },
    },
    data() {
        return {
            isSucc: false,
            isErr: false,
        }
    },
    methods: {
        del() { //delete
            this.$store.state.device.isMark = 0;
        },
        licensenfo() { //delete
            this.$store.dispatch('licensenfo');
        },
        auto(e) {
            e.target.parentNode.lastChild.click();
        },
        addLicense(e) {
            if (this.initNo == 0) {
                this.$store.state.license.initNo = 1;
                var formData = new FormData(e.target);
                this.$store.dispatch('addLicense', formData);
            }

        },
    }
}
</script>
<style type="text/css" scoped>
/* licence */

.licence {
    padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);
    overflow: hidden;
}

.licence>p {
    font-size: 18px;
    color: #666;
    padding-bottom: 40px;
    position: relative;
}

.licence>p i {
    display: inline-block;
    font-style: normal;
    margin-right: 15px;
}

.licence>p i.old-i {
    margin-right: 0;
    width: -moz-calc(100% - 140px);
    width: -webkit-calc(100% - 140px);
    width: calc(100% - 140px);
}

.licence>p i em {
    color: #03a9f4;
    font-style: normal;
    cursor: pointer;
}

.licence>p span {
    display: inline-block;
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

.licence>p span:hover {
    background: #039be5;
}

.licence>p span.old {
    position: absolute;
    right: 0;
}

.licence>p span.old:nth-child(3) {
    right: 100px;
}

.licence table {
    width: 100%;
}

.licence table td {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    font-size: 16px;
}

.licence table tr:nth-child(even) {
    background: #fcfcfc;
}

.licence table td:nth-child(1) {
    font-weight: bold;
    width: 168px;
}

.licence table td.alert {
    color: #ff5252;
}

.licence form {
    display: inline-block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
}

.licence form input {
    width: 100%;
    height: 100%;
    filter: alpha(opacity=0);
    /* IE */
    -moz-opacity: 0;
    /* 老版Mozilla */
    -khtml-opacity: 0;
    /* 老版Safari */
    opacity: 0;
    /* 支持opacity的浏览器*/
    cursor: pointer;
    font-size: 0;
    position: absolute;
    top: 0px;
    left: 0;
}

.licence form button {
    filter: alpha(opacity=0);
    /* IE */
    -moz-opacity: 0;
    /* 老版Mozilla */
    -khtml-opacity: 0;
    /* 老版Safari */
    opacity: 0;
    /* 支持opacity的浏览器*/
}
</style>
