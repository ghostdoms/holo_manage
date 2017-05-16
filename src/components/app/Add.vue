<template>
    <div class="addApp">
        <div>
            <a>Upload Application</a>
        </div>
        <form @submit.stop.prevent="addApp">
            <p>App package</p>
            <label for="">
                <i>Browse...</i>
                <input type="file" name="package" @change.stop.prevent="filePackage">
            </label>
            <p v-if="count>0">Dependency</p>
            <label for="" v-for="(i,index) in depend">
                <i>Browse...</i>
                <input type="file" :name="i.name" @change.stop.prevent="fileDpend">
                <span class="remove" @click.stop="removeDepend(index)">Remove</span>
            </label>
            <span class="addDep" @click.stop="add">Add denpendency</span>
            <p>Deploy</p>
            <input type="hidden" name="dependency_count" v-model="count">
            <button type="submit">{{go}}</button><b style="padding-left:10px;font-style:normal;" v-if="Progress<1 && Progress>0">{{Math.ceil(Progress * 100) + '%'}}</b>
        </form>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'addapp',
    created() {
        this.init();
    },
    computed: {
        isBase: function() {
            return this.$store.state.license.isBase;
        },
        go() {
            return this.$store.state.app.go;
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
        Progress() {
            return this.$store.state.app.Progress;
        },
    },
    watch: {
        go() {
            return this.$store.state.app.go;
        },
        Progress() {
            return this.$store.state.app.Progress;
        },
        count() {
            console.log(this.count);
        }
    },
    data() {
        return {
            msg: 'add',
            count: 1,
            depend: [{
                name: 'dependency_1',
            }]
        }
    },
    methods: {
        init() {
            //this.$store.state.license.isBase = false;
        },
        filePackage(e) {
            var file = e.target.files[0];
            var name = file.name;
            e.target.parentNode.firstChild.innerHTML = name;
        },
        fileDpend(e) {
            var file = e.target.files[0];
            var name = file.name;
            e.target.parentNode.firstChild.innerHTML = name;
        },
        removeDepend(index) {
            if (this.count < 1) {
                this.count = 1
            } else {
                if (this.count == 1) {
                    this.depend=[];
                } else {
                    var el = event.target;
                    el.parentNode.parentNode.removeChild(el.parentNode);
                    this.$nextTick(function() {
                        var arr = [];
                        for (var i = 1; i <= this.count; i++) {
                            document.querySelectorAll('label')[i].querySelectorAll('input')[0].setAttribute('name', 'dependency_' + i)
                        };
                    });
                };
                this.count--;
            };

        },
        add(e) {
            this.count++;
            this.depend.push({
                name: 'dependency_' + this.count
            })
        },
        addApp(e) {
            this.$store.state.app.go = 'Go...'
            if (this.initNo == 0) {
                this.$store.state.app.initNo = 1;
                var formData = new FormData(e.target);
                this.$store.dispatch('addApp', formData);
            }

        }
    }
}
</script>
<style type="text/css" scoped>
/* add app */

.addApp {
    /*padding: 30px;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);*/
    height: 100%;
    overflow: hidden;
}

.addApp div {
    margin-bottom: 40px;
}

.addApp div a {
    font-size: 18px;
    font-weight: bold;
    color: #444;
    display: inline-block;
}

.addApp label {
    display: block;
    width: 364px;
    height: 28px;
    border: 1px solid #e1e1e1;
    outline: none;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    text-indent: 10px;
    margin-bottom: 13px;
    position: relative;
}

.addApp label i {
    position: absolute;
    left: 0;
    top: 4px;
    color: #999;
    font-size: 14px;
    margin-left: 10px;
    font-style: normal;
}

.addApp label input[type=file] {
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

.addApp label span {
    position: absolute;
    left: 100%;
    display: inline-block;
    padding: 0 15px;
    height: 30px;
    background: #eee;
    color: #999;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    margin-left: 10px;
    border: none;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
}

.addApp form >span {
    display: inline-block;
    padding: 0 15px;
    height: 30px;
    background: #eee;
    color: #999;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    border: none;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-top: 10px;
}

.addApp form span:hover {
    background: #03a9f4;
    color: #fff;
}

.addApp form p {
    font-size: 16px;
    color: #444;
    padding-bottom: 10px;
}

.addApp form p.info {
    padding-bottom: 15px;
}

.addApp form button {
    width: 140px;
    height: 30px;
    background: #03a9f4;
    color: #fff;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    border: none;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
}

.addApp form button:hover {
    background: #039be5;
}

.addApp form a {
    font-size: 16px;
    color: #03a9f4;
}
</style>
