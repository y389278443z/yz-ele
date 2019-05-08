<template>
    <div class="order" v-loading="isLoading">
        <header-top :text="text" ref="head"></header-top>
        <div class="order-container" ref="content">
            <ul class="order-list">
                <li class="disFlex" v-for="(item, index) in orderList" :key="index" @click="orderDetail(item.restaurant_id)">
                    <div class="order-img">
                        <img :src="imgBaseUrl + '/shopIcon/' + item.restaurant_image_url" alt="" class="img100">
                    </div>
                    <div class="order-info grow1">
                        <div class="order-name alignItem marginB1">
                            <h3 class="grow1 textEllipsis">{{item.restaurant_name}}</h3>
                            <!--<p :style="{color: '#'+item.status_bar.color}">{{item.status_bar.title}}</p>-->
                        </div>
                        <div class="c999 marginB2">{{changeDate(item.order_time)}}</div>
                        <div class="alignItem pte5">
                            <p>{{item.shop_name}}商铺的{{item.total_amount}}件商品</p>
                            <p class="ce6">￥{{item.total_quantity}}</p>
                        </div>
                        <div class="tr pte5 cf5">
                            <span class="to-pay" v-if="isTimeOver(item.order_time)" @click.stop="toPay(item.restaurant_id)">去支付</span>
                            <span class="to-pay" v-else @click.stop="getNew(item.restaurant_id)">再来一单</span>
                        </div>
                    </div>
                </li>
                <li v-show="loadMore">
                    加载更多<span class="el-icon-loading"></span>
                </li>
                <li v-if="noMore">
                    没有更多了
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <foot-bottom ref="foot"></foot-bottom>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import footBottom from '@/components/footer/footer';
    import {getAllOrder} from "../../api";
    import {getStorage, getStyle, formate} from "../../utils";
    import {imgBaseUrl} from "../../utils/env";

    const user_info = 'user_info';

    export default {
        name: 'order',
        components: {
            headerTop,
            footBottom
        },
        data() {
            return {
                text:'订单列表',
                userId: null,
                offset: 0,
                orderList: [],
                imgBaseUrl,
                loadMore: false,
                isLoading: false,
                noMore: false,
                headHeight: 0,
                windowHeight: 0
            }
        },
        methods: {
            isTimeOver(time) {
                let now = Date.now();
                if (new Date(time).getTime() + 15*60*1000 < now) {
                    return false
                }
                return true;
            },
            changeDate(time) {
                return formate(time, 'yyyy-MM-dd hh:mm:ss')
            },
            toPay(restaurant_id) {
                this.$router.push({ name: 'pay' , params: {restaurant_id}});
            },
            getNew(id) {
                this.$router.push({name: 'shopDetail', params: {id}})
            },
            orderDetail(restaurant_id) {
                this.$router.push({name: 'orderDetail', params: {restaurant_id}});
            },
            scrollLoad() {
                if (!this.noMore && !this.isLoading) {
                    let t = document.documentElement.scrollTop,
                        contentHeight = getStyle(this.$refs.content, 'height');
                    if (t + this.windowHeight - this.headHeight > contentHeight) {
                        this.loadMore = true;
                        this.offset += 10;
                        this.isLoading = true;
                        getAllOrder(this.userId, this.offset).then(res => {
                            if (res.length >= 10) {
                                this.orderList = [...this.orderList, ...res];
                            } else {
                                this.loadMore = false;
                                this.noMore = true;
                            }
                            this.isLoading = false;
                        })
                    }
                }
            }
        },
        created() {
            this.userId = JSON.parse(getStorage(user_info)).user_id;
            getAllOrder(this.userId, this.offset).then(res => {
                this.orderList = res;
                if (res.length < 10) {
                    this.noMore = true;
                }
            })
        },
        mounted() {
            this.headHeight = getStyle(this.$refs.head.$el, 'height');
            this.windowHeight = document.documentElement.clientHeight;
            window.addEventListener('scroll', this.scrollLoad);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollLoad);
        }
    }
</script>

<style scoped lang="less">
    .marginB2{margin-bottom:.2rem;}
    .marginB1{margin-bottom:.1rem;}
    .pte5{padding:.2rem 0; border-top:1px solid #e5e5e5;}
    .order-img{
        width:1.25rem;
        height:1.25rem;
        margin-right:.2rem;
    }
    .order-list{
        font-size:.24rem;
        margin-bottom:1rem;
        &>li{
            border-bottom:.2rem solid #eee;
            padding:.2rem .2rem 0;
            justify-content: space-between;
            &:last-child{
                border-bottom:none;
                text-align: center;
                padding:.2rem;
            }
        }

        .to-pay{
            border:1px solid currentColor;
            border-radius: .1rem;
            padding:.05rem .1rem;
            cursor: pointer;
        }
    }
</style>