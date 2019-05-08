<template>
    <div class="orderDetail tc">
        <header-top :text="text"></header-top>
        <div class="detail-content" v-if="detail">
            <div>
                <img :src="imgBaseUrl + '/shopIcon/' + detail.restaurant_image_url" alt="" class="img-limit">
            </div>
            <h2 class="state"></h2>
            <div>
                <el-button type="success" size="mini" @click="toPay" v-if="isTimeOver(detail.order_time)">前去支付</el-button>
                <el-button type="primary" size="mini" @click="getMore" v-else>再来一单</el-button>
            </div>
            <ul class="order-list">
                <li class="alignItem" @click="getMore">
                    <h3>{{detail.shop_name}}</h3>
                    <span class="el-icon-arrow-right"></span>
                </li>
                <li v-for="(item, index) in detail.order_list" class="tl" :key="index">
                    {{item.name}} * {{item.count}}
                </li>
                <li class="tr">
                    <span>总计</span>
                    <span class="f20 cf5">￥{{detail.total_quantity}}</span>
                </li>
            </ul>
            <ul class="order-info tl c999">
                <li>配送信息</li>
                <li>送达时间：尽快送达</li>
                <li>送货地址：{{detail.total_address}}</li>
                <li>配送方式： 蜂鸟专送</li>
                <li>订单时间：{{formateTime(detail.order_time)}}</li>
            </ul>
        </div>
        <!--<div v-else class="marginT20">-->
            <!--<p class="f12 c999 marginB4">页面刷新不见了，请返回上一层重新选择</p>-->
            <!--<el-button type="primary" size="small" @click="goBack">返回</el-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {imgBaseUrl} from "../../utils/env";
    import {getOrder} from "../../api";
    import {getStorage, formate} from "../../utils";

    const USER_INFO = 'user_info';


    export default {
        name: 'orderDetail',
        components: {
            headerTop
        },
        data() {
            return {
                text: '订单详情',
                imgBaseUrl,
                userId: null,
                restaurant_id: null,
                detail: null
            }
        },
        created() {
            this.restaurant_id = this.$route.params.restaurant_id;
            let userInfo = JSON.parse(getStorage(USER_INFO));
            this.userId = userInfo.user_id;
            getOrder(this.userId, this.restaurant_id).then(res => {
                console.log(res);
                this.detail = res[0];
            })
        },
        methods: {
            isTimeOver(time) {
                let now = Date.now();
                if (new Date(time).getTime() + 15*60*1000 < now) {
                    return false
                }
                return true;
            },
            formateTime(time) {
                return formate(time, 'yyyy-MM-dd hh:mm:ss');
            },
            getMore() {
                this.$router.push({name: 'shopDetail', params: {id: this.restaurant_id}});
            },
            toPay() {
                this.$router.push({ name: 'pay' , params: {id: this.restaurant_id}});
            }
        }
    }
</script>

<style scoped lang="less">
    .marginT20{margin-top:2rem;}
    .marginB4{margin-bottom:.4rem;}
    .marginR2{margin-right:.2rem;}
    .orderDetail{
        position:fixed;
        top:0;
        bottom:0;
        left: 0;
        width:100%;
        background:#fff;
        z-index:3;
        overflow-y: auto;
    }
    .img-limit{
        width:2rem;
        height:2rem;
        border-radius: 50%;
    }
    .state{
        margin: .4rem 0;
    }
    .order-list{
        margin-top:.3rem;
        li{
            padding: .3rem;
            border-top:1px solid #f5f5f5;
        }
    }
    .order-info{
        li{
            padding:.2rem;
            border-top:1px solid #f5f5f5;
        }
    }
</style>