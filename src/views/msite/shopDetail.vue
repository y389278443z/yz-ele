<template>
    <div class="pr box" ref="box">
        <div class="shopDetail" v-loading="showLoading">
            <div class="top f12">
                <div class="top-info disFlex">
                    <div class="imgbox shrink0">
                        <img :src="imgBaseUrl + 'shopIcon/' +seller.image_path" alt="" class="img100" v-if="seller.image_path">
                    </div>
                    <div class="grow1 bfcHidden">
                        <div class="alignItem" @click="modelShow = 1">
                            <div class="grow1 marginR2">
                                <h3 class="f16 textEllipsis marginB1">{{seller.name}}</h3>
                                <p class="textEllipsis marginB1">评价{{seller.rating_count}}   月售{{seller.recent_order_num}}单</p>
                                <p class="marginB2" v-if="seller.order_lead_time">商家配送约{{seller.order_lead_time > 120 ? '大于两小时' : seller.order_lead_time + '分钟'}}</p>
                                <p class="marginB2" v-if="!seller.order_lead_time && seller.opening_hours">营业时间：{{seller.opening_hours.join(',')}}</p>
                            </div>
                            <span class="el-icon-arrow-right"></span>
                        </div>
                        <div class="alignItem" v-if="seller.supports">
                            <p class="marginR2 textEllipsis"><span :class="'state-text'+ seller.supports[0].id">{{seller.supports[0].icon_name}}</span>{{seller.supports[0].description}}</p>
                            <p @click="modelShow = 2" class="shrink0">{{seller.supports.length}}个优惠<span class="el-icon-caret-bottom"></span></p>
                        </div>
                    </div>
                </div>
                <div class="top-notice textEllipsis">
                    <span class="notice-name">公告</span>
                    <span>{{seller.description || seller.promotion_info}}</span>
                </div>
                <div class="top-background">
                    <img :src="imgBaseUrl + 'shopIcon/' +seller.image_path" alt="" class="img100" v-if="seller.image_path">
                </div>
                <div class="goBack" @click="goBack">
                    <span class="el-icon-arrow-left"></span>
                </div>
            </div>
            <div class="detail-nav">
                <ul class="nav-list disFlex tc c999">
                    <li class="grow1" @click="showContent = 'food'" :class="{active: showContent === 'food'}">
                        点餐
                    </li>
                    <li class="grow1" @click="showContent = 'rating'" :class="{active: showContent === 'rating'}">
                        评论
                    </li>
                    <li class="grow1" @click="showContent = 'seller'" :class="{active: showContent === 'seller'}">
                        商家
                    </li>
                </ul>
            </div>

            <div class="food-content f12 disFlex" v-show="showContent === 'food'" ref="content">
                <div class="food-left" ref="foodLeft" id="foodLeft">
                    <ul class="left-list" v-if="goods">
                        <li v-for="(item, index) in goods" :key="index" :class="{active: index==currentIndex}" @click="jumpToItem(index)">
                            <span>{{item.name}}</span>
                            <span class="amount" v-if="showAmount(item)">{{showAmount(item)}}</span>
                        </li>
                    </ul>
                </div>
                <div class="food-right grow1 bfcHidden" ref="foodRight" id="foodRight">
                    <ul class="right-list" v-if="goods">
                        <li v-for="(item, index) in goods" :key="index" class="food-list-hook">
                            <h3 class="classify-title">{{item.name}}</h3>
                            <ul class="classify-list">
                                <li class="disFlex" v-for="(val, key) in item.foods" :key="key" @click="toDetail(val)">
                                    <div class="rightImg">
                                        <img :src="imgBaseUrl + 'menu/' + shopId + '/' +val.image_path" alt="">
                                    </div>
                                    <div class="rightInfo grow1 c999 bfcHidden">
                                        <h3 class="c222 marginB1 f14 textEllipsis">{{val.name}}</h3>
                                        <p class="textEllipsis marginB1">{{val.description}}</p>
                                        <p class="marginB2">
                                            <span>月售{{val.month_sales}}份</span>
                                            <span>好评率{{val.satisfy_rate}}%</span>
                                        </p>
                                        <div class="alignItem">
                                            <div>
                                                <span class="f16 cf5 marginR2">￥{{val.specfoods[0].price}}</span>
                                                <span v-if="val.specifications.length">起</span>
                                            </div>
                                            <num-control :food="val" @choice-state="choiceState" :state="val.specifications.length" @calculateTotal="calculateTotal"></num-control>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <transition name="fade">
                    <div class="food-detail" v-if="showDetail">
                        <div class="detail-close" @click="showDetail = false">
                            <span class="el-icon-error"></span>
                        </div>
                        <div class="detail-info">
                            <img :src="imgBaseUrl + 'menu/' + shopId + '/' + choiceDetail.image_path" alt="" class="img100">
                            <div class="detail-msg">
                                <h3 class="f18 marginB1">{{choiceDetail.name}}</h3>
                                <p class="marginB1">月售{{choiceDetail.month_sales}}份，好评率{{choiceDetail.satisfy_rate}}%</p>
                                <div class="f15 cf5 marginB2 alignItem">
                                    <p>
                                        ￥{{choiceDetail.specfoods[0].price}} <span v-if="choiceDetail.specfoods.length > 1">起</span>
                                    </p>
                                    <num-control :food="choiceDetail" @choice-state="choiceState" :state="choiceDetail.specifications.length" @calculateTotal="calculateTotal"></num-control>
                                </div>
                                <p><span class="c999">简介：</span>{{choiceDetail.description}}</p>
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="shopcart flexAlign" @click="showCartList">
                    <div class="cart-icon" :class="{'cartScale': cartScale, 'empty-cart': !cartAmount, }">
                        <span class="iconfont icon-gouwuche"></span>
                        <span class="amount" v-if="cartAmount">{{cartAmount}}</span>
                    </div>
                    <div class="cart-info">
                        <p class="f18 cart-total" v-if="totalPrice">￥{{totalPrice}}</p>
                        <p v-else>未选购商品</p>
                        <p>另需配送费{{this.seller.float_delivery_fee}}元</p>
                    </div>
                    <div class="cart-submit-btn pointer" :class="{'can-pay': canPay}" @click.stop="payMoney">
                        去结算
                    </div>
                </div>
            </div>
            <div class="rating-content" v-show="showContent === 'rating'" ref="ratingContent">
                <div ref="ratingBox">
                    <div class="rating-score alignItem f12" v-if="serviceScore">
                        <div class="rating-left alignCenter">
                            <div class="total-score ce6">
                                {{serviceScore.overall_score.toFixed(1)}}
                            </div>
                            <div>
                                <p>商家评分</p>
                                <star-rating :ratingScore="4"></star-rating>
                                <p class="marginT1 c999">高于周边{{serviceScore.compare_rating.toFixed(3)*100 + '%'}}</p>
                            </div>
                        </div>
                        <div class="rating-right alignItem grow1">
                            <div>
                                <p class="title">味道</p>
                                <p>{{serviceScore.food_score.toFixed(1)}}</p>
                            </div>
                            <div>
                                <p class="title">服务</p>
                                <p>{{serviceScore.service_score.toFixed(1)}}</p>
                            </div>
                            <div>
                                <p class="title">配送</p>
                                <p>{{serviceScore.service_score.toFixed(1)}}</p>
                            </div>
                        </div>
                    </div>
                    <rating-select class="select-list" :ratingDesc="ratingDesc" :rating="ratings" :selectType="selectType" :onlyContent="onlyContent" @change-type="changeType" @toggle-content="toggleContent"></rating-select>
                    <div class="rating-wrapper">
                        <ul class="rating-list">
                            <li class="disFlex f12" v-for="(item, index) in ratings" :key="index">
                                <div class="rating-img">
                                    <img :src="imgBaseUrl + 'icons/' + item.avatar" alt="">
                                </div>
                                <div class="ratingInfo grow1">
                                    <div class="alignItem marginB1">
                                        <h3>{{item.reply.username}}</h3>
                                        <span class="c999">{{item.rated_at | formateTime}}</span>
                                    </div>
                                    <div class="flexAlign marginB1 c999">
                                        <star-rating :ratingScore="item.rating"></star-rating>
                                        <span class="item-score" :class="{ce6: item.rating == 5}">{{item.rating | scoreToText}}</span>
                                    </div>
                                    <div class="rating-text">
                                        {{item.rating_text}}
                                    </div>
                                    <div class="reply-text">
                                        商家回复：{{item.reply.content}}
                                    </div>
                                    <ul class="rating-img-ul" v-if="item.order_images">
                                        <li v-for="(img, key) in item.order_images" :key="key">
                                            <img :src="imgBaseUrl + 'comment/' + img" alt="">
                                        </li>
                                    </ul>
                                    <div class="recommend-list" v-if="item.rating > 2">
                                        <span class="iconfont icon-zan1"></span>
                                        <span v-for="(val, key) in item.food_names" :key="key" class="rc-item">{{val}}</span>
                                    </div>
                                </div>
                            </li>
                            <li class="tc" v-show="loadMore">
                                <span class="el-icon-loading"></span>加载更多
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="seller-content f12 c999" v-if="showContent === 'seller'">
                <div class="send-msg">
                    <h3 class="msg-title">配送信息</h3>
                    <p>由<span class="baseBg cfff">{{seller.delivery_mode.text}}</span>提供配送，约{{seller.order_lead_time}}分钟送达，距离<span v-if="seller.distance">{{seller.distance}}km</span><span v-else>未知</span></p>
                    <p>配送费￥{{seller.float_delivery_fee}}</p>
                </div>
                <div class="send-msg">
                    <h3 class="msg-title">商家服务</h3>
                    <p v-for="(item, index) in seller.supports" :key="index">
                        <span :class="'state-text'+item.id">{{item.icon_name}}</span>
                        {{item.description}}
                    </p>
                </div>
                <div class="send-msg">
                    <h3 class="msg-title">商家信息</h3>
                    <p>{{seller.promotion_info}}</p>
                    <ul class="seller-info-list">
                        <li>
                            <h4>品类</h4>
                            <p>{{seller.category}}</p>
                        </li>
                        <li>
                            <h4>商家电话</h4>
                            <p>{{seller.phone}}</p>
                        </li>
                        <li>
                            <h4>地址</h4>
                            <p>{{seller.address}}</p>
                        </li>
                        <li>
                            <h4>营业时间</h4>
                            <p>
                                <span v-for="(time,key) in seller.opening_hours" :key="key">{{time}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="send-msg alignItem f14" @click="gotoQualify">
                    <h4>营业资格</h4>
                    <span class="el-icon-arrow-right"></span>
                </div>
            </div>

        </div>

        <div class="model" v-show="modelShow > 0" @click.stop="modelShow = 0">
            <transition enter-active-class="zoomIn">
                <div class="shop-msg f12" v-if="modelShow == 1">
                    <h3 class="marginB2"><span class="title-pinpai">品牌</span>{{seller.name}}</h3>
                    <ul class="msg alignItem tc marginB2">
                        <li>
                            <h4>{{seller.rating}}</h4>
                            <p>评分</p>
                        </li>
                        <li>
                            <h4>{{seller.recent_order_num}}单</h4>
                            <p>月售</p>
                        </li>
                        <li>
                            <h4 v-if="seller.order_lead_time">{{seller.order_lead_time > 120 ? '大于两小时' : seller.order_lead_time + '分钟'}}</h4>
                            <H4 v-else>待定</H4>
                            <p>时间</p>
                        </li>
                        <li>
                            <h4>{{seller.float_delivery_fee}}元</h4>
                            <p>配送费</p>
                        </li>
                        <li>
                            <h4>{{seller.distance}}</h4>
                            <p>距离</p>
                        </li>
                    </ul>

                    <p class="base-title alignCenter c999">公告</p>
                    <p>{{seller.description || seller.promotion_info}}</p>
                    <p class="tc"><span class="el-icon-circle-close-outline close"></span></p>
                </div>
            </transition>
            <transition name="fade">
                <div class="discount-msg" v-if="modelShow == 2">
                    <h3 class="title tc marginB2">优惠活动</h3>
                    <ul class="discount-list">
                        <li v-for="(item, index) in seller.supports" :key="index">
                            <span :class="'state-text'+item.id">{{item.icon_name}}</span>
                            {{item.description}}
                        </li>
                    </ul>
                    <span class="discount-close el-icon-close"></span>
                </div>
            </transition>

            <transition name="fade">
                <div class="discount-msg" v-if="modelShow == 3" @click.stop>
                    <header class="disFlex">
                        <img :src="imgBaseUrl + 'menu/' + shopId + '/' + choiceDetail.image_path" alt="" class="typeImg shrink0">
                        <div class="grow1 bfcHidden">
                            <h3 class="textEllipsis marginB2">{{choiceDetail.name}}</h3>
                            <p class="f18 cf5">￥{{choiceDetail.specfoods[choiceIndex].price}}</p>
                        </div>
                    </header>
                    <section class="typeInfo">
                        <h4 class="c999 marginB2">规格</h4>
                        <ul class="typeList clear">
                            <li v-for="(item, index) in choiceDetail.specfoods" :key="index" :class="{active: index == choiceIndex}" @click="choiceIndex = index">{{item.specs[0].value}}</li>
                        </ul>
                    </section>
                    <div class="btm-btn">
                        <el-button size="medium" type="primary" class="width100" @click="typeChoice">选好了</el-button>
                    </div>
                    <div class="discount-close el-icon-close" @click="modelShow = 0"></div>
                </div>
            </transition>

        </div>
        <transition name="fade">
            <div class="cartModel" v-if="cartShow > 0" @click="cartShow = 0">
                <ul class="cartList">
                    <li class="baseBg cfff alignItem">
                        <span>已选商品</span>
                        <p @click.stop="clearCart">
                            <span class="el-icon-delete marginR1"></span>
                            <span>清空</span>
                        </p>
                    </li>
                    <li class="alignItem" v-for="(item, index) in cartList" :key="index">
                        <div>
                            <h3 class="textEllipsis">{{item.name}}</h3>
                            <p v-if="item.specs.length">{{item.specs[0].name}}：{{item.specs[0].value}}</p>
                            <p v-else>规格：无</p>
                        </div>
                        <div class="flexAlign">
                            <span class="marginR2 cf5 bold">￥{{(item.price * item.count).toFixed(2)}}</span>
                            <num-control :food="item" @calculateTotal="calculateTotal"></num-control>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>

        <transition name="moveleft">
            <router-view class="qualify"></router-view>
        </transition>
    </div>
</template>

<script>
    const CART_LIST = 'cart_list';
    const SHOP_INFO = 'shop_info';
    const SHOP_DETAIL = 'SHOP_DETAIL';
    const GEO_HASH = 'geo_hash';


    import BetterScroll from 'better-scroll';
    import numControl from '@/components/numControl/numControl';
    import starRating from '@/components/star/starRating';
    import ratingSelect from '@/components/ratingSelect/ratingSelect';
    import {formate, getStyle} from "../../utils";
    import {shopDetail, menuList, commentList} from "../../api";
    import {imgBaseUrl} from "../../utils/env";
    import {getStorage, setStorage} from "../../utils";

    export default {
        name: 'shopDetail',
        components: {
            numControl,
            starRating,
            ratingSelect
        },
        data() {
            return {
                geohash: '',
                shopId: null,
                modelShow: 0,
                showContent: 'food',
                foodScroll: null,
                foodMenu: null,
                ratingScroll: null,
                onlyContent: false,
                ratingDesc: [],
                selectType: '全部',
                goods: [],
                ratings: [],
                seller: {},
                listHeight: [],
                showLoading: true,
                scrollY:0,
                showDetail: false,
                choiceDetail: {},
                choiceIndex: 0,
                imgBaseUrl,
                cartObj: {},
                cartShow: 0,
                cartScale: false,
                goodsChange: false,
                cartList: [],
                serviceScore: null,
                ratingPage: 1,
                ratingCount: 0,
                loadMore: false
            }
        },
        methods: {
            changeType(name) {
                this.selectType = name;
                this.ratingPage = 1;
                this.getRatingList().then( res => {
                    this.ratings = res;
                    this.$msg({
                        text: '切换成功'
                    })
                })
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
            },
            gotoQualify() {
                this.$router.push({name: 'qualify'});
            },
            jumpToItem(item) {
                let i = item == 0 ? 0 : this.listHeight[item - 1];
                this.foodScroll.scrollTo(0, -i, 100);
            },
            _calculateHeight() {
                let height = 0,
                    footList = document.getElementsByClassName('food-list-hook');
                for (let i = 0, len = footList.length; i < len; i++) {
                    height += footList[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            toDetail (item) {
                this.showDetail = true;
                this.choiceDetail = item;
            },
            choiceState(obj) {
                this.modelShow = 3;
                this.choiceDetail = obj;
            },
            goBack() {
                this.$router.back(-1);
            },
            typeChoice() {
                let itemId = this.choiceDetail.item_id;
                for (let i of this.goods) {
                    if (i.id == itemId) {
                        for (let key of i.foods) {
                            if (key.specifications.length && key.specfoods[0].food_id == this.choiceDetail.specfoods[0].food_id) {
                                if (key.specfoods[this.choiceIndex].count) {
                                    key.specfoods[this.choiceIndex].count++;
                                } else {
                                    this.$set(key.specfoods[this.choiceIndex], 'count', 1);
                                }
                                console.log(key);
                            }
                        }
                    }
                }
                this.goodsChange = !this.goodsChange;
                this.modelShow = 0;
                console.log(this.cartList);
            },
            calculateTotal() {
                this.cartScale = true;
                this.goodsChange = !this.goodsChange;
                setTimeout(() => {
                    this.cartScale = false;
                },300)
            },
            showCartList() {
                if (!this.cartList.length) return;
                this.cartShow = this.cartShow ? 0 : 1;
            },
            clearCart() {
                for (let i of this.goods) {
                    for (let item of i.foods) {
                        if (item.specfoods && item.specfoods.length) {
                            item.specfoods.forEach(item => {
                                if (item.count) item.count = 0;
                            })
                        }
                    }
                }
                this.goodsChange = !this.goodsChange;
            },
            payMoney() {
                if (this.canPay) {
                    let storeInfo = JSON.parse(getStorage(SHOP_INFO));
                    storeInfo = storeInfo ? storeInfo : [];
                    let hasIn = false;
                    for (let i of storeInfo) {
                        if (i.id == this.shopId) {
                            hasIn = true;
                            break;
                        }
                    }
                    if (!hasIn) storeInfo.push(this.seller);
                    console.log(storeInfo);
                    setStorage(SHOP_INFO, storeInfo);
                    this.$router.push({name: 'confirmOrder', params: {id: this.shopId}});
                }
            },
            showAmount(item) {
                let n = 0,
                    id = item.id;
                this.cartList.forEach(item => {
                    if (item.classify_id === id) {
                        n += item.count;
                    }
                });
                return n;
            },
            getRatingList() {
                let tag;
                if (this.selectType == '全部') tag = 0;
                else if (this.selectType == '好评') tag = 1;
                else if (this.selectType == '差评') tag = 2;
                else tag = 0;
                return commentList(this.onlyContent, tag, this.ratingPage);
            },
            getMoreRating() {

            }
        },
        created() {
            this.geohash = getStorage(GEO_HASH);
            this.shopId = this.$route.params.id;
            if (this.storage) {
                let shopCartList = JSON.parse(this.storage)[this.shopId];
                this.cartList = shopCartList ? shopCartList : [];
            }
            shopDetail(this.geohash, this.shopId).then(res => {
                this.seller = res[0];
                this.$store.commit(SHOP_DETAIL, res[0]);
                return menuList(this.shopId);
            }).then(res => {
                this.ratingDesc = res[0].ratings.tags;
                if (this.cartList.length) {
                    this.cartList.forEach(item => {
                        let row_id = item.classify_id,
                            item_id = item.item_id,
                            food_id = item.food_id;
                        for (let i of res[0].menu) {
                            if (i.id == row_id) {
                                for (let food of i.foods) {
                                    if (food.item_id == item_id) {
                                        for (let n = 0; n < food.specfoods.length; n++) {
                                            if (food.specfoods[n].food_id == food_id) {
                                                food.specfoods[n] = item;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                this.goods = res[0].menu;
                this.showLoading = false;
                this.getRatingList().then(res => {
                    this.ratings = res;
                })
            });

        },
        computed: {
            currentIndex() {
                let lists = this.listHeight;
                for(let i = 0, len = lists.length; i< len; i++) {
                    let height1 = lists[i],
                        height2 = lists[i + 1];
                    if (height1 <= this.scrollY && this.scrollY < height2 && height2) {
                        return i + 1
                    }
                }
                return 0;
            },
            cartAmount() {
                let n = 0;
                this.cartList.forEach(item => {
                    n += item.count;
                });
                return n;
            },
            canPay() {
                return this.totalPrice >= this.seller.float_minimum_order_amount;
            },
            totalPrice() {
                let total = 0;
                this.cartList.forEach(item => {
                    total += item.price * item.count;
                });
                return total.toFixed(2);
            },
            storage() {
                return getStorage(CART_LIST);
            }
        },
        filters: {
            scoreToText(val) {
                if (val == 5) {
                    return '超赞'
                } else {
                    return val;
                }
            },
            formateTime(time) {
                return formate(time, 'yyyy-MM-dd hh:mm');
            }
        },
        watch: {
            showLoading(val) {
                if (!val) {
                    this.$nextTick(() => {
                        this._calculateHeight();
                        this.foodMenu = new BetterScroll(this.$refs.foodLeft, {
                            click: true
                        });
                        this.foodScroll = new BetterScroll(this.$refs.foodRight, {
                            probeType: 3,
                            click: true
                        });
                        this.foodScroll.on('scroll', (e) => {
                            this.scrollY = Math.abs(e.y);
                            let content = this.$refs.content,
                                top = content.offsetTop,
                                t = document.body.scrollTop;
                            if (t < top) {
                                window.scrollTo(0, top);
                                content.style.paddingTop = '0';
                            }
                        });
                    })
                }
            },
            cartAmount(newV) {
                if (newV <= 0) {
                    this.cartShow = 0;
                }
            },
            goodsChange() {
                let arr = [],
                    id = this.shopId;
                for (let i of this.goods) {
                    let id = i.id;
                    for (let item of i.foods) {
                        if (item.specfoods && item.specfoods.length) {
                            item.specfoods.forEach(item => {
                                if (item.count > 0) {
                                    item.classify_id = id;
                                    arr.push(item);
                                }
                            })
                        }
                    }
                }
                this.cartList = arr;
                let list = this.storage ? JSON.parse(this.storage) : {};
                list[id] = arr;
                setStorage(CART_LIST, list);
            },
            onlyContent() {
                this.ratingPage = 1;
                this.getRatingList().then(res => {
                    this.ratings = res;
                    this.$msg({
                        text: '切换成功'
                    })
                })
            },
            showContent(val) {
                if (val === 'rating' && this.ratingCount === 0) {
                    this.$nextTick(() => {
                        let contentHeight = getStyle(this.$refs.ratingContent, 'height');
                        this.ratingScroll = new BetterScroll(this.$refs.ratingContent, {
                            probeType: 2,
                            click: true
                        });
                        let isLoading = true;
                        this.ratingScroll.on('scroll', (e) => {
                            let ratingY = Math.abs(e.y),
                                boxHeight = getStyle(this.$refs.ratingBox, 'height');
                            let content = this.$refs.ratingContent,
                                top = content.offsetTop,
                                t = document.body.scrollTop;
                            if (t < top) {
                                window.scrollTo(0, top);
                                content.style.paddingTop = '0';
                            }
                            if (ratingY + contentHeight >= (boxHeight - 50) && isLoading) {
                                this.loadMore = true;
                                this.ratingPage += 1;
                                isLoading = false;
                                this.getRatingList().then( res => {
                                    this.ratings = [...this.ratings, ...res];
                                    if (res.length >= 10) {
                                        isLoading = true;
                                    }
                                    this.loadMore = false;
                                })
                            }
                        });
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @keyframes scales {
        25% {
            transform: scale(.8);
        }
        75%{
            transform:scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    .marginB1{margin-bottom:.1rem;}
    .marginT1{margin-top: .1rem;}
    .marginB2{margin-bottom:.2rem;}
    .marginR1{margin-right:.1rem;}
    .marginR2{margin-right:.2rem;}
    .top{
        background:rgba(7,17,27,.5);
        color:#fff;
        position:relative;
    }
    .top-info{
        padding:.4rem .4rem 0;
    }
    .imgbox{
        width:1.4rem;
        height:1.4rem;
        overflow: hidden;
        margin-right:.3rem;
    }
    .top-notice{
        padding:.1rem .2rem;
        margin-top:.2rem;
        background: rgba(7,17,27,.2);
    }
    .notice-name{
        background:#fff;
        color:#222;
        border-radius: 4px;
        margin-right:.1rem;
    }
    .top-background{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        filter:blur(6px);
        z-index:-1;
        overflow: hidden;
    }
    .goBack{
        position:absolute;
        top:0;
        left:0;
        font-size:.45rem;
        color:#fff;
        padding:.1rem;
        span{
            font-weight: 800;
        }
    }
    .detail-nav{
        position:sticky;
        top:0;
        left:0;
        z-index:1;
        box-shadow: 0 1px 0 1px #f5f5f5;
    }
    .nav-list{
        background:#fff;
        li{
            height:.8rem;
            box-sizing: border-box;
            line-height:.8rem;
            border-bottom:.04rem solid transparent;
            color:#999;
            &.active{
                border-color:#409EFF;
                color:#222;
            }
        }
    }
    .food-content,.rating-content{
        height:calc(100vh - .8rem);
        overflow: hidden;
    }
    .food-left{
        width:1.5rem;
        flex-shrink: 0;
        margin-right:.2rem;
        background:#f2f2f2;
        padding-bottom:1rem;
    }
    .food-detail{
        position:fixed;
        z-index:2;
        bottom:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        .detail-close{
            position:absolute;
            right:.25rem;
            top:.25rem;
            color:#ccc;
            font-size:.5rem;
        }
        .detail-info{
            padding-bottom:1rem;
            .detail-msg{
                padding:0 .3rem;
                color:#666;
            }
        }
    }
    .shopcart{
        position:fixed;
        padding-left:1.6rem;
        bottom:0;
        left:0;
        right:0;
        z-index:3;
        background:#4B4B4C;
        color:#999;
        height:1rem;
        .cart-icon{
            position:absolute;
            left:.3rem;
            top:-.2rem;
            width:1rem;
            height:1rem;
            border-radius: 50%;
            background-color:#409EFF;
            border:.1rem solid #444;
            text-align: center;
            line-height:.8rem;
            box-sizing: border-box;
            color:#fff;
            &.empty-cart{
                background-image: radial-gradient(circle,#222 1rem,#2f2f2f 0);
                color:#555;
            }
            &.cartScale{
                animation: scales linear .3s;
            }
            .iconfont{
                font-size:.5rem;
            }
        }
        .cart-info{
            flex:1;
        }
        .cart-total{
            color:#fff;
        }
        .cart-submit-btn{
            font-size:.28rem;
            text-align: center;
            line-height:1rem;
            height:100%;
            width:2rem;
            flex-shrink: 0;
            cursor: pointer;
            color:#fff;
            &.can-pay{
                background:#67C23A;
                color:#fff;
            }
        }
    }
    .amount{
        position:absolute;
        text-align: center;
        right:-.1rem;
        top:-.1rem;
        display: inline-block;
        width:.3rem;
        height:.3rem;
        background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
        color:#fff;
        border-radius: 50%;
        line-height:.3rem;
    }
    .cartList{
        position:absolute;
        bottom:1rem;
        left:0;
        right:0;
        background:#fff;
        padding-bottom: .2rem;
        li{
            padding:.15rem;
            border-bottom:1px solid #eee;
            &>div:first-child {
                width: 65%;
            }
            &>div:last-child{
                width:35%;
            }
        }
    }
    .left-list{
        padding-bottom:1rem;
        li{
            box-sizing: border-box;
            padding:.3rem .15rem;
            word-break: break-all;
            position:relative;
            img{
                width:.24rem;
                height:auto;
                margin-right:.1rem;
                vertical-align: middle;
            }
            &.active{
                background:#fff;
            }
            .amount{
                right: 0;
                top: .1rem;
            }
        }
    }
    .right-list{
        padding-bottom:1rem;
        .rightImg{
            flex-shrink: 0;
            img{
                width:1.8rem;
                height:1.8rem;
            }
        }
        .rightInfo{
            padding:0 .2rem;
        }
        .classify-title{
            padding: .3rem 0;
            color:#666;
        }
        .classify-list{
            li{
                margin-bottom:.3rem;
                &:last-child{
                    margin-bottom:0;
                }
            }
        }
    }
    .rating-content{
        .rating-score{
            padding:.25rem .4rem .5rem;
        }
        .rating-left{
            .star-rating{
                margin-top:.1rem;
                height:.24rem;
            }
        }
        .total-score{
            font-size:.7rem;
            margin-right:.2rem;
        }
        .rating-right{
            margin-left:1rem;
            font-size:.4rem;
            color:#999;
            .title{
                font-size:.24rem;
            }
        }
        .select-list{
            padding:.3rem .3rem 0;
            border-bottom:1px solid #f5f5f5;
            border-top:.08rem solid #f5f5f5;
        }
    }
    .rating-list{
        &>li{
            padding:.2rem .3rem;
            border-bottom:1px solid #f5f5f5;
            .rating-img{
                margin-right:.2rem;
                flex-shrink: 0;
                img{
                    width:.6rem;
                    height:.6rem;
                    border-radius: 50%;
                }
            }
            .ratingInfo{
                .star-rating{
                    height:.22rem;
                }
                .item-score{
                    margin-left:.1rem;
                }
                .rating-img-ul{
                    margin-top:.2rem;
                    li{
                        display: inline-block;
                        margin-right:.1rem;
                        img{
                            width:2.5rem;
                            height:2.5rem;
                        }
                    }
                }
            }
            .reply-text{
                padding: .2rem;
                background:#dddddd;
                margin: .2rem 0;
            }
            .recommend-list{
                margin-top:.2rem;
                .iconfont{
                    vertical-align: middle;
                }
                .rc-item{
                    display: inline-block;
                    color: #6d7885;
                    padding:.1rem;
                    background:#ebf5ff;
                    border-radius: .1rem;
                    margin: 0 .1rem .2rem;
                }
            }
        }
    }
    .send-msg{
        padding:.3rem .2rem;
        border-bottom:.15rem solid #f5f5f5;
        h3,h4{
            color:#333;
        }
        h3{
            margin-bottom:.2rem;
        }
    }
    .seller-info-list{
        margin-top:.2rem;
        li{
            padding:.2rem;
            display:flex;
            align-items: center;
            justify-content: space-between;
            border-top:1px solid #f5f5f5;
            &:last-child{
                padding-bottom:0;
            }
            h4{
                width: 2rem;
                flex-shrink: 0;
            }
        }
    }

    .model,.cartModel{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(0,0,0,.3);
    }
    .model{
        z-index:4;
    }
    .cartModel{
        z-index:2;
    }
    .shop-msg{
        width:4.5rem;
        padding:.25rem;
        border-radius: .1rem;
        background:#fff;
        position:absolute;
        top:30%;
        left:50%;
        margin-left:-2.5rem;
    }
    .msg{
        p{
            color:#999;
            font-size:.24rem;
        }
    }
    .close{
         font-size:.4rem;
        color:#fff;
         position:absolute;
        bottom:-1rem;
        left:50%;
        margin-left:-.2rem;
    }
    .discount-msg{
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        background:#fff;
        box-sizing:border-box;
        padding:.5rem;
    }
    .typeImg{
        width:1.6rem;
        height:1.6rem;
        margin-right:.1rem;
        margin-bottom:.3rem;
        border:1px solid #ddd;
    }
    .typeInfo{
        padding: .2rem 0 1rem;
    }
    .typeList{
        min-height:5rem;
        li{
            min-width: 2rem;
            background:#eee;
            border-radius: .1rem;
            height: .6rem;
            line-height:.6rem;
            padding: 0 .2rem;
            text-align: center;
            float:left;
            margin-right:.2rem;
            margin-bottom:.3rem;
            cursor: pointer;
            &.active{
                background:rgba(35, 149, 255, 0.2);
                color:rgb(35, 149, 255);
                font-weight: 700;
            }
        }
    }
    .discount-list{
        font-size:.26rem;
        height:4rem;
        li{
            margin-bottom:.2rem;
        }
    }
    .discount-close{
        position:absolute;
        right:.3rem;
        top:.3rem;
        font-size:.4rem;
    }
    .fade-enter,.fade-leave-to{
        opacity:0;
        bottom:-100%;
    }
    .fade-enter-to,.fade-leave{
        transition: all .2s;
    }
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }
    .zoomIn{
        animation-name: zoomIn;
        animation-duration: .4s;
    }
    .width100{width:100%;}
    .qualify{
        position:fixed;
        z-index:4;
        background:#fff;
        top:0;
        bottom:0;
        left:0;
        width:100%;
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


</style>
