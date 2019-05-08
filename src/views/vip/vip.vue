<template>
    <div class="vip c999">
        <header-top :text="text"></header-top>
        <div class="content f12">
            <div class="pad2 title">
                为账户<span class="c222 user-name">y389278443z</span>购买会员
            </div>
            <div class="pad2 alignItem borderB1">
                <span>会员特权</span>
                <span>会员说明<i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="pad2 disFlex borderB1">
                <div class="imgbox">
                    <img src="images/profile/vip1.png" alt="" class="img100">
                </div>
                <div class="grow1">
                    <h4>减免配送费</h4>
                    <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                    <p>蜂鸟专送专享</p>
                </div>
            </div>
            <div class="pad2 disFlex borderB2">
                <div class="imgbox">
                    <img src="images/profile/vip2.png" alt="" class="img100">
                </div>
                <div class="grow1">
                    <h4>减免配送费</h4>
                    <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                    <p>蜂鸟专送专享</p>
                </div>
            </div>
        </div>
        <div class="c222">
            <div class="pad2 borderB1 f16">
                开通会员
            </div>
            <div class="pad2 borderB2 alignItem">
                <div>
                    一个月 <span class="cf5">￥20</span>
                </div>
                <p><el-button type="warning" plain size="small">购买</el-button></p>
            </div>
            <div class="pad2 borderB2 alignItem">
                <p>兑换会员</p>
                <router-link :to="{name: 'exchange'}" class="c999 f12">使用卡号卡密 <span class="el-icon-arrow-right
"></span></router-link>
            </div>
            <div class="pad2 borderB2 alignItem">
                <p>购买记录</p>
                <router-link :to="{name: 'vipList'}" class="c999 f12">开发票 <span class="el-icon-arrow-right
"></span></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'vip',
        components: {
            headerTop
        },
        data() {
            return {
                text: '会员中心'
            }
        }
    }
</script>

<style scoped lang="less">
    .pad2{padding:.2rem;}
    .borderB1{border-bottom:1px solid #f5f5f5;}
    .borderB2{border-bottom:.2rem solid #f5f5f5;}
    .title{background:#f0f0f0;}
    .user-name{
        margin:0 .2rem;
    }
    .content{
        h4{
            font-size:.3rem;
            color:#666;
        }
        p{
            margin-top:.1rem;
        }
    }
    .imgbox{
        width:.7rem;
        height:.8rem;
        margin-right:.2rem;
    }
</style>