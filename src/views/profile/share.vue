<template>
    <div class="share">
        <div>
            <img src="images/share.png" alt="" class="img100">
        </div>
        <div class="share-box">
            <el-button type="warning" class="share-btn">点击分享</el-button>
        </div>
        <div class="cancel-box">
            <el-button type="info" class="share-btn" @click="goBack">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'share',
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .share{
        height:100vh;
        background: #fe2b04;
    }
    .share-box,.cancel-box{
        padding:0 5%;
        margin-bottom:.3rem;
    }
    .share-btn{
        width:100%;
    }
</style>