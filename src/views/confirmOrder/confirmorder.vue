<template>
    <div class="height100" v-loading="loading">
        <header-top :text="text"></header-top>
        <div class="verify-address baseBg flexAlign" @click="toAddressList">
            <div class="grow1 bfcHidden address-left" v-if="defaultAddress">
                <p class="marginB1">订单配送至<span class="address-state">{{tagName(defaultAddress.tag_type)}}</span></p>
                <h2 class="textEllipsis marginB1">{{defaultAddress.address}}({{defaultAddress.address_detail}})</h2>
                <p><span>{{defaultAddress.name}}</span>(<span>{{defaultAddress.sex == 1 ? '先生' : '女士'}}</span>) <span>{{defaultAddress.phone}}</span></p>
            </div>
            <div class="grow1 f16" v-else>
                <span class="el-icon-location-outline"></span>请添加一个地址
            </div>
            <span class="el-icon-arrow-right shrink0"></span>
        </div>
        <div class="confirm-info" v-if="shopInfo">
            <div class="confirm-box">
                <ul>
                    <li>
                        <div>
                            <p>送达时间</p>
                            <span class="f12 state-text1 cfff" v-if="shopInfo.delivery_mode.text">{{shopInfo.delivery_mode.text}}</span>
                        </div>
                        <div class="baseC">
                            尽快送达 <span v-if="shopInfo.order_lead_time">({{leadTime}})送达</span>
                        </div>
                    </li>
                    <li>
                        <p>支付方式</p>
                        <p class="baseC">在线支付</p>
                    </li>
                </ul>
            </div>
            <div class="confirm-box" v-if="orderList">
                <ul class="order-list">
                    <li>
                        <h3>
                            {{shopInfo.name}}
                        </h3>
                    </li>
                    <li v-for="(item, index) in orderList" :key="index">
                        <div class="flexAlign bfcHidden grow1">
                            <div class="bfcHidden grow1">
                                <p class="each-info textEllipsis">{{item.name}}</p>
                                <p v-if="item.specs.length">{{item.specs[0].name}}：{{item.specs[0].value}}</p>
                                <p v-else>规格：无</p>
                            </div>
                            <span class="shrink0">× {{item.count}}</span>
                        </div>
                        <span class="shrink0 marginL2">￥{{(item.price * item.count).toFixed(2)}}</span>
                    </li>
                    <li>
                        <span>配送费</span>
                        <span>￥{{shopInfo.float_delivery_fee || 0}}</span>
                    </li>
                    <li>
                        <span>红包</span>
                        <div>
                            <span>0个可用</span>
                            <span class="el-icon-arrow-right"></span>
                        </div>
                    </li>
                    <li>
                        <span class="c999">优惠说明<span class="el-icon-question f12"></span></span>
                        <span>小计 <span class="f20">￥{{totalPrice()}}</span></span>
                    </li>
                </ul>
            </div>
            <div class="confirm-box">
                <ul>
                    <li @click="toRemark">
                        <span class="shrink0 marginR2">订单备注</span>
                        <span class="c999 grow1 bfcHidden alignCenter">
                            <span class="grow1 bfcHidden textEllipsis tr">{{this.remarkInfo ? this.remarkInfo.join(',') : '口味、偏好'}}</span>
                            <span class="el-icon-arrow-right shrink0"></span>
                        </span>
                    </li>
                    <li>
                        <div>
                            <p class="marginB1">号码保护<span class="el-icon-question c999 f12" @click="hidePhone = true"></span></p>
                            <p class="c999 f12">号码保护中，将对商家、骑手隐藏您的真实手机号</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="confirm-footer disFlex f16">
            <p class="confirm-total grow1">￥{{totalPrice()}}</p>
            <span class="confirm-btn shrink0 tc" @click="goPay">去支付</span>
        </div>
        <transition name="moveleft">
            <router-view class="remark-box"></router-view>
        </transition>
        <transition name="moveleft">
            <div class="remark-box hide-box" v-show="hidePhone">
                <h3>服务介绍</h3>
                <p>对骑手、商家隐藏您的真实手机号，保护您的隐私。</p>
                <img src="images/protect.png" alt="" class="img100">
                <h3>使用说明</h3>
                <p>号码保护服务不会向您额外收费，费用由吃了吗承担。</p>
                <p class="marginB4">当号码保护的服务提供商出现服务故障时，您的手机号码将会显示给商家和骑手，以确保商家和骑手能为你送餐。</p>
                <el-button type="primary" class="width100" @click="hidePhone = false">返回</el-button>
            </div>
        </transition>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getStorage, formate, removeStorage, setStorage} from "../../utils";
    import {addOrder} from "../../api";

    const CART_LIST = 'cart_list';
    const SHOP_INFO = 'shop_info';
    const USER_INFO = 'user_info';
    const GEO_HASH = 'geo_hash';


    export default {
        name: 'confirmorder',
        components: {
            headerTop
        },
        data() {
            return {
                text: '确认订单',
                shopId: '',
                orderList:null,
                shopInfo: null,
                hidePhone: false,
                userId: null,
                geohash: null,
                loading: false
            }
        },
        created() {
            this.shopId = this.$route.params.id;
            let cartList = JSON.parse(getStorage(CART_LIST));
            let shopList = JSON.parse(getStorage(SHOP_INFO));
            this.geohash = getStorage(GEO_HASH);
            let userInfo = JSON.parse(getStorage(USER_INFO));
            if (userInfo) {
                this.userId = userInfo.user_id;
            }
            for (let shop of shopList) {
                if( shop.id == this.shopId) {
                    this.shopInfo = shop;
                    break;
                }
            }
            if (cartList) {
                for(let key in cartList) {
                    if (key == this.shopId) {
                        this.orderList = cartList[key];
                    }
                }
            }
        },
        methods: {
            tagName(tag) {
                if (tag == 1) return '家';
                if (tag == 2) return '公司'
                if (tag == 3) return '学校'
            },
            goPay() {
                if (!this.defaultAddress) {
                    this.$msg({text: '请选择一个地址！'});
                    return;
                } else if (!this.orderList) {
                    this.$msg({text: '选择商品为空，请重新选择！'});
                    return;
                }
                let newArr = [];
                this.orderList.forEach(item => {
                    newArr.push({
                        id: item.food_id,
                        name: item.name,
                        packing_fee: item.packing_fee,
                        price: item.price,
                        count: item.count,
                        sku_id: item.sku_id,
                        specs: [item.specs],
                        stock: item.stock,
                    })
                });
                this.loading = true;
                const totalAddress = this.defaultAddress.address + '(' + this.defaultAddress.address_detail + ')';
                const shop_name = this.shopInfo.name;
                const shop_image_path = this.shopInfo.image_path;
                addOrder(this.userId, this.shopId, shop_name, shop_image_path, totalAddress, newArr).then(res => {
                    if (res.status > 0) {
                        let cartList = JSON.parse(getStorage(CART_LIST));
                        delete cartList[this.shopId];
                        if (Object.keys(cartList).length == 0) {
                            removeStorage(CART_LIST);
                        } else {
                            setStorage(CART_LIST, cartList);
                        }
                        this.$alert({
                            message: res.message,
                            type: 'success',
                            success: () => {
                                this.$router.push({ name: 'pay' , params: {restaurant_id: this.shopId}});
                            }
                        });
                    } else {
                        this.$alert({
                            message: res.message,
                            type: 'error'
                        })
                    }
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.$alert({
                        message: err,
                        type: 'error'
                    })
                })
            },
            totalPrice() {
                let total = 0;
                if (this.orderList) {
                    this.orderList.forEach(item => {
                        total += item.price * item.count
                    });
                    if (this.shopInfo.float_delivery_fee) total += this.shopInfo.float_delivery_fee;
                }
                return total.toFixed(2);
            },
            toRemark() {
                this.$router.push({name: 'remark'});
            },
            toAddressList() {
                this.$router.push({name: 'caddress'});
            }
        },
        computed: {
            remarkInfo() {
                return this.$store.getters.remarkInfo
            },
            leadTime() {
                let now = new Date().getTime();
                let lead = this.shopInfo.order_lead_time || 0;
                if (lead) {
                    now += lead*60*1000;
                    return formate(now, 'hh:mm');
                }
                return '';
            },
            defaultAddress() {
                return this.$store.getters.defaultAddress
            }
        }
    }
</script>

<style scoped lang="less">
    .marginB1{margin-bottom:.1rem;}
    .marginB4{margin-bottom: .4rem;}
    .marginL2{margin-left: .2rem;}
    .marginR2{margin-right: .2rem;}
    .verify-address{
        padding:.3rem .2rem;
        color:#fff;
    }
    .address-left{
        margin-right:.15rem;
    }
    .address-state{
        margin-left:.2rem;
        display: inline-block;
        font-size:.24rem;
        border:1px solid currentColor;
        line-height:.24rem;
        box-sizing: border-box;
    }
    .confirm-info{
        padding:.2rem .2rem 0;
        overflow: hidden;
        margin-bottom:1rem;
    }
    .confirm-box{
        box-sizing:border-box;
        padding:.2rem .3rem;
        margin:0 auto .2rem;
        background:#fff;
        border-radius: .1rem;
        ul{
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:.2rem 0;
                border-bottom:1px solid #f5f5f5;
                &:last-child{
                    border-bottom:none;
                }
            }
        }
        .order-list{
            li{
                .list-img{
                    font-size:0;
                    width:.7rem;
                    height:.7rem;
                    vertical-align: middle;
                    flex-shrink: 0;
                    margin-right:.1rem;
                }
                .each-info{
                    margin-right:.3rem;
                }
            }
        }
    }
    .confirm-footer{
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        height:1rem;
        background:#3c3c3c;
        .confirm-total{
            line-height:1rem;
            padding:0 .3rem;
            color:#fff;
        }
        .confirm-btn{
            height:100%;
            line-height:1rem;
            cursor:pointer;
            width:2rem;
            color:#fff;
            background:#67C23A;
        }
    }
    .remark-box{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        width: 100%;
        background:#fff;
        z-index:4;
        overflow-y: auto;
    }
    .moveleft-enter, .moveleft-leave-to{
        left:100%;
    }
    .moveLeft-enter-to, .moveLeft-leave{
        left:0;
    }
    .moveleft-enter-active, .moveleft-leave-active{
        transition: left .3s;
    }
    .hide-box{
        box-sizing: border-box;
        padding: .4rem;
        p{
            color:#999;
        }
    }
</style>