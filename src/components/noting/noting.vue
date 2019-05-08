<template>
    <div class="find-nothing alignCenter">
        <img src="images/noting.png" alt="">
        <div>
            <p>{{text}}</p>
            <p class="f12 c999" v-if="tryMore">{{tryMore}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'noting',
        props: {
            text: {
                default: '没有搜索结果'
            },
            tryMore: {
                default: '换个关键词试试吧'
            }
        }
    }
</script>

<style scoped lang="less">
    .find-nothing{
        font-size:.24rem;
        padding:1rem 0 .5rem;
        img{
            width:25vw;
            height:auto;
        }
    }
</style>