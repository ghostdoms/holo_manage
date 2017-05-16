<template>
    <div class="alert">
        <div class="succ" v-if="isSucc"><img src="../assets/succ.png" alt="">install success</div>
        <div class="err" v-if="isErr"><img src="../assets/error.png" alt="">install error</div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'alert',
    props:{
    	isSucc:{
    		type: Boolean
    	},
    	isErr: {
            type: Boolean
        }
    },
    computed: {
    	
    },
    watch: {

    },
    data() {
        return {
            message: ''
        }
    },
    methods:{

    }
}
</script>
<style>
.succ,
.err {
    padding: 0 30px;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    box-shadow: 0 0 10px rgba(4, 0, 0, .16);
    -webkit-box-shadow: 0 0 10px rgba(4, 0, 0, .16);
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 5;
}

.succ img,
.err img {
    vertical-align: middle;
    padding-right: 10px;
}
</style>
