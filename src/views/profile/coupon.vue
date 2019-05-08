<template>
    <div class="coupon tc">
        <div class="img-box">
            <img src="images/hongbao.gif" alt="" class="img100">
        </div>
        <h4 class="no-hongbao">没有店铺红包，快去领几个吧~</h4>
    </div>
</template>

<script>
    export default {
        name: 'coupon'
    }
</script>

<style scoped lang="less">
    .img-box{
        width:4rem;
        height:4rem;
        margin: 1.5rem auto 0;
    }
    .no-hongbao{
        margin-top:.5rem;
        color:#999;
    }
</style>