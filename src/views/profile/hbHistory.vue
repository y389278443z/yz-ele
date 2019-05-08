<template>
    <div class="hbHistory">
        <header-top :text="text"></header-top>
        <div class="content tc">
            <p class="no-more">没有更多了~</p>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'hbHistory',
        components: {
            headerTop
        },
        data () {
            return {
                text: '历史红包'
            }
        }
    }
</script>

<style scoped lang="less">
    .no-more{
        margin: .4rem 0;
        color:#999;
    }
</style>