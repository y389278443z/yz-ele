<template>
    <div class="pay pr">
        <header-top :text="text"></header-top>
        <div class="count-down">
            <p>支付剩余时间</p>
            <p class="f20 marginT2 count-time">{{min}}分：{{sec}}秒</p>
            <div class="pay-info alignItem" v-if="order">
                <p>{{order.shop_name}}</p>
                <p class="pointer c999" @click="showModel = true">查看详情</p>
                <p class="cf5">￥{{order.total_quantity}}</p>
            </div>
        </div>
        <p class="pay-way c999">支付方式</p>
        <div class="disFlex tc pad2">
            <div class="grow1">
                <p><img src="images/icons/zfb.png" alt="" class="icon-img"></p>
                <el-radio v-model="payWay" label="1" border>支付宝</el-radio>
            </div>
            <div class="grow1">
                <p><img src="images/icons/wx.png" alt="" class="icon-img"></p>
                <el-radio v-model="payWay" label="2" border>微信</el-radio>
            </div>
        </div>
        <div class="pad2">
            <el-button type="primary" class="width100" @click="pay">确认支付</el-button>
            <div class="marginT2">
                <el-button type="success" class="width100" @click="goHome">返回首页</el-button>
            </div>
        </div>
        <div class="order-model" v-if="showModel" @click="showModel = false">
            <h3 class="marginT20 marginB5">
                {{order.shop_name}}店铺的订单：
            </h3>
            <ul class="marginB5">
               <li v-for="(item, index) in order.order_list">
                   {{item.name}} * {{item.count}}
               </li>
            </ul>
            <p>地址：{{order.total_address}}</p>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getStorage} from "../../utils";
    import {getOrder} from "../../api";
    const USER_INFO = 'user_info';

    export default {
        name: 'pay',
        components: {
            headerTop
        },
        data() {
            return {
                text: '在线支付',
                minutes: 15,
                seconds: 0,
                payWay: '1',
                timer: null,
                userId: null,
                order: null,
                showModel: false
            }
        },
        methods: {
            minus() {
                this.timer = setInterval(() => {
                    if (this.seconds == 0 && this.minutes == 0) {
                        clearInterval(this.timer);
                        this.$alert({
                            message: '支付超时！',
                            type: 'error'
                        })
                    } else if (this.seconds == 0 && this.minutes != 0) {
                        this.seconds = 59;
                        this.minutes--;
                    } else {
                        this.seconds--;
                    }
                }, 1000)
            },
            toTwo(n) {
                return n < 10 ? '0'+n : n;
            },
            pay() {
                this.$alert({
                    message: '请在正经的app中支付！',
                    type: 'warning'
                })
            },
            goHome() {
                this.$router.push({name: 'msite'});
            }
        },
        computed: {
            sec() {
                return this.toTwo(this.seconds);
            },
            min() {
                return this.toTwo(this.minutes);
            }
        },
        created() {
            let restaurant_id = this.$route.params.restaurant_id;
            let userInfo = JSON.parse(getStorage(USER_INFO));
            this.userId = userInfo.user_id;
            getOrder(this.userId, restaurant_id).then(res => {
                this.order = res[0];
                let now = Date.now();
                console.log(this.order.order_time);
                let time = new Date(this.order.order_time).getTime();
                if (time + 15*60*1000 <= now) {
                    this.minutes = 0;
                    this.seconds = 0;
                } else {
                    let lastM = 15*60*1000 - (now - time);
                    this.minutes = Math.floor(lastM/60000);
                    this.seconds = Math.floor(lastM%6000 / 1000);
                }

            });
        },
        mounted() {
            this.minus();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped lang="less">
    .pad2{padding:.2rem;}
    .marginT2{margin-top:.2rem;}
    .marginT20{margin-top:2rem;}
    .marginB5{margin-bottom:.5rem;}
    .count-down{
        padding: .5rem .3rem;
        text-align: center;
    }
    .pay-way{
        padding:.2rem;
        background:#f2f2f2;
    }
    .icon-img{
        width:.8rem;
        height:.8rem;
    }
    .count-time{
        padding-bottom:.5rem;
        border-bottom:1px solid #f5f5f5;
    }
    .pay-info{
        padding-top:.5rem;
    }
    .pay-list{
        li{
            padding:.2rem;
            font-size:.36rem;
            &:first-child{
                border-bottom:1px solid #f5f5f5;
            }
        }
    }
    .order-model {
        box-sizing: border-box;
        padding:.3rem;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        background:rgba(0, 0, 0, .7);
        z-index:2;
        color:#fff;
    }
</style>