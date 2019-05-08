<template>
    <div class="toTop" @click="toTop">
        <span class="el-icon-upload2"></span>
    </div>
</template>

<script>
    export default {
        name: 'toTop',
        methods: {
            toTop() {
                document.documentElement.scrollTo(0, 0);
            }
        }
    }
</script>

<style scoped lang="less">
    .toTop {
        position:fixed;
        right:.5rem;
        bottom:1.5rem;
        padding:.25rem;
        span{
            background:#fff;
            display: inline-block;
            width:.7rem;
            text-align: center;
            line-height:.7rem;
            color:#999;
            border-radius: 50%;
            border:1px solid #aaa;
            font-size:.4rem;
        }
    }
</style>