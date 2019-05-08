<template>
    <div class="download">
        <header-top :text="text"></header-top>
        <div class="content">
            <div class="imgbox">
                <img src="images/logo.jpg" alt="" class="img100">
            </div>
            <p class="tc marginB4">下载吃了吗APP</p>
            <div class="btnbox">

                <el-button type="success" class="width100" @click="download">下载</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'download',
        components: {
            headerTop
        },
        data() {
            return {
                text: '下载'
            }
        },
        methods: {
            download() {
                window.location.href = 'https://h5.ele.me/download/';
            }
        }
    }
</script>

<style scoped lang="less">
    .marginB4{margin-bottom:.4rem;}
    .imgbox {
        width:4rem;
        margin:.5rem auto;
        border-radius: .6rem;
        overflow: hidden;
    }
    .btnbox{
        padding:0 .3rem;
    }
</style>