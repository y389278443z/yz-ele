<template>
    <div class="serviceDetail">
        <header-top :text="text"></header-top>
        <div class="content">
            <h2>{{text}}：</h2>
            <p class="indent2">此处省略N个字...........</p>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'serviceDetail',
        components: {
            headerTop
        },
        data() {
            return {
                text: ''
            }
        },
        mounted() {
            this.text = this.$route.params.urlName;
        }
    }
</script>

<style scoped lang="less">
    .content{
        line-height:2em;
        padding:.2rem;
    }
    .serviceDetail{
        position:absolute;
        top:0;
        left:0;
        right:0;
        min-height:100vh;
        background:#fff;
    }
    .indent2{
        text-indent: 2em;
    }
</style>