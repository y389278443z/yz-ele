<template>
    <div class="height100">
        <div class="yz-header baseBg">
            <div class="lc-header">
                <span class="el-icon-arrow-left header-left-icon" @click="back"></span>
                <span>我的优惠</span>
                <router-link :to="{name: 'exchangehongbao'}" class="header-right-btn">兑换红包</router-link>
            </div>
        </div>
        <div class="benefit-nav baseBg flexAlign">
            <router-link :to="{name: 'hongbao'}" class="grow1">
                <span :class="{active: routerName==='hongbao'}">红包(0)</span>
            </router-link>
            <router-link :to="{name: 'coupon'}" class="grow1">
                <span :class="{active: routerName==='coupon'}">店铺红包(0)</span>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'benefit',
        computed: {
            routerName () {
                return this.$route.name
            }
        },
        methods: {
            back() {
                this.$router.push({name: 'profile'})
            }
        }
    }
</script>

<style scoped lang="less">
    .benefit-nav{
        text-align: center;
        color:#fff;
        &>a{
            padding:.2rem 0;
            color:#fff;
            span.active{
                border-bottom:2px solid currentColor;
            }
        }
    }
</style>