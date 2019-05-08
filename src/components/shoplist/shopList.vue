<template>
    <ul class="store-list" ref="list" v-if="shopList.length">
        <li v-for="(item, index) in shopList" :key="item.id" @click="toDetail(item.id)" class="list-item">
            <div class="disFlex ">
                <div class="list-image">
                    <img :src="imgBaseUrl + '/shopIcon/' +item.image_path" alt="">
                </div>
                <div class="list-info disFlex">
                    <section class="alignItem bfcHidden">
                        <h3 class="flexAlign bfcHidden f15 c222">
                            <span class="title-pinpai" v-if="item.is_premium">品牌</span>
                            <span class="textEllipsis">{{item.name}}</span>
                        </h3>
                        <div class="right-operate" @click.stop="showModel($event)"><i class="el-icon-more"></i></div>
                    </section>
                    <section class="score-info alignItem">
                        <div class="flexAlign scale8L">
                            <star-rating :ratingScore="item.rating" class="star-rating"></star-rating>
                            <span>{{item.rating}}</span>
                            <span>月售{{item.recent_order_num}}单</span>
                        </div>
                        <div class="state-text1 scale8R" v-if="item.delivery_mode">{{item.delivery_mode.text}}</div>
                    </section>
                    <section class="time-info alignItem f12">
                        <div class="scale8L shrink0">
                            <span>￥{{item.float_minimum_order_amount}}起送</span><span class="before-separator">配送费￥{{item.float_delivery_fee}}</span>
                        </div>
                        <div class="scale8R shrink0">
                            <span>{{item.distance}}</span><span class="before-separator">{{item.order_lead_time | timeShow}}</span>
                        </div>
                    </section>
                </div>
            </div>
            <div class="description">
                <span class="borderSpan disIn scale8L" v-for="(item, index) in item.category.split('/')" :key="index">{{item}}</span>
            </div>
            <div class="active-info" v-if="item.activities.length">
                <div class="active-item alignItem" v-for="(state, key) in item.activities" :key="key">
                    <div class="flexAlign bfcHidden">
                        <span class="state-text">{{state.icon_name}}</span>
                        <span class="textEllipsis" style="flex: 1;">{{state.name}}</span>
                    </div>
                    <span class="active-select ccc" @click.stop="showHide($event)" v-if="key ===0 && item.activities.length >= 2">{{item.activities.length}}个活动<i class="el-icon-caret-bottom"></i></span>
                </div>
            </div>
            <div class="store-model alignCenter disNone" @click.stop="closeModel($event, index)">
                <span class="no-like">不喜欢</span>
            </div>
        </li>
        <li class="tc" v-show="loadMore">
            <span class="el-icon-loading"></span>加载更多
        </li>
        <li class="tc" v-show="noMore">
            没有更多了~~~
        </li>
        <div class="loading" v-show="loading">
            <div class="load-box">
                <img src="images/timg.gif" alt="">
            </div>
        </div>
    </ul>
</template>

<script>
    import starRating from '@/components/star/starRating';
    import {getShopList, searchShop} from "../../api";
    import {imgBaseUrl} from "../../utils/env";
    import {loadMore} from "../../utils";

    export default {
        name: 'shopList',
        components: {
            starRating
        },
        props: [
            'geohash',
            'kind',
            'isNew',
            'isNear',
            'sort_by',
            'keyword',
            'confirmStatus'
        ],
        data() {
            return {
                shopList: [],
                imgBaseUrl,
                page: 1,
                loadMore: false,
                noMore: false,
                toTop: false,
                loading: true,
                scrollFun: null
            }
        },
        filters: {
            timeShow(time) {
                if (time < 60) return time+'分钟';
                else if (time == 60) return '1小时';
                else if (time <= 120) return (time/60).toFixed(1) + '小时';
                return '大于两小时';
            }
        },
        methods: {
            showHide(e) {
                let target = e.currentTarget;
                target.classList.toggle('active');
                target.closest('.active-info').classList.toggle('heightAuto');
            },
            showModel(e) {
                let target = e.currentTarget;
                target.closest('.list-item').getElementsByClassName('store-model')[0].classList.remove('disNone');
            },
            closeModel(e, index) {
                e.currentTarget.classList.add('disNone');
                if (e.target.classList.contains('no-like')) {
                    this.shopList.push(this.shopList[index]);
                    this.shopList.splice(index,1);
                }
            },
            toDetail(id) {
                console.log(id);
                this.$router.push({name: 'shopDetail', params: {id}});
            },
            getMore() {
                if (this.noMore) return Promise.resolve('noMore');
                this.loading = true;
                this.loadMore = true;
                this.page += 1;
                return getShopList(this.geohash, this.kind, this.sort_by, this.isNew, this.isNear, this.page).then(res => {
                    if (res.length < 10) {
                        this.noMore = true;
                    }
                    this.shopList =[...this.shopList, ...res];
                    this.loadMore = false;
                    this.loading = false;
                })
            },
            async listenPropChange() {
                this.shopList = [];
                this.page = 1;
                this.loadMore = true;
                this.loading = true;
                this.noMore = false;
                this.shopList = await getShopList(this.geohash, this.kind, this.sort_by, this.isNew, this.isNear, this.page);
                this.loading =false;
                if (this.shopList.length < 10) {
                    this.noMore = true;
                }
                this.loadMore = false;
                this.$nextTick(() => {
                   this.scrollFun = loadMore(this.$refs.list, this.getMore);
                })
            }
        },
        async created() {
            if (this.geohash && this.keyword) {
                this.shopList = await searchShop(this.geohash, this.keyword);
                this.noMore = true;
                this.loading = false;
            } else {
                this.shopList = await getShopList(this.geohash, this.kind, this.sort_by, this.isNew, this.isNear, this.page);
                this.loading = false;
                if (this.shopList.length < 10) {
                    this.noMore = true;
                }
                this.$nextTick(() => {
                    this.scrollFun = loadMore(this.$refs.list, this.getMore);
                })
            }

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollFun);
        },
        watch: {
            kind() {
                this.listenPropChange();
            },
            isNear() {
                this.listenPropChange();
            },
            sort_by() {
                this.listenPropChange();
            },
            confirmStatus() {
                this.listenPropChange();
            },
            keyword() {
                this.loading = true;
                this.noMore = false;
                searchShop(this.geohash, this.keyword).then(res => {
                    this.shopList = res;
                    this.loading = false;
                    this.noMore = true;
                })
            }
        }
    }
</script>

<style scoped lang="less">

    .scale8{transform: scale(.9);}
    .scale8L{ .scale8; transform-origin: left center;}
    .scale8R{ .scale8; transform-origin: right center;}
    .store-list{
        margin-bottom:1rem;
        &>li{
            position:relative;
            padding:.3rem .2rem;
            font-size:.24rem;
            color:#666;
            border-bottom:1px solid #e5e5e5;
            .list-image{
                width:1.4rem;
                height:1.4rem;
                margin-right:.2rem;
                flex:none;
                img{
                    height:100%;
                    width:100%;
                }
            }
            .h3-title{
                font-size:.3rem;
                color:#222;
                display: flex;
                align-items: center;
            }
            .list-info{
                flex-direction: column;
                flex-grow: 1;
                justify-content: space-between;
                overflow: hidden;
            }
            .star-rating{
                height:12px;
            }
            .right-operate{
                margin-left:.4rem;
            }
            .score-info{
                span{
                    margin: 0 .2rem;
                }
            }
            .store-model{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0, .4);
                .no-like{
                    text-align: center;
                    display: inline-block;
                    width:1rem;
                    height:1rem;
                    line-height:1rem;
                    background:#fff;
                    color:#333;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
        }
    }
    .before-separator{
        &:before{
            content: "|";
            color:#ccc;
            margin:0 .1rem;
        }
    }
    .description{
        padding-left:1.6rem;
        padding-top:.1rem;
    }
    .borderSpan{
        border:1px solid #e5e5e5;
        padding: 1px 2px;
        border-radius: 2px;
        margin: 0 .1rem;
    }
    .active-info{
        padding-left:1.6rem;
        padding-top:.1rem;
        height:.5rem;
        overflow: hidden;
        &.heightAuto{
            height:auto;
        }
        .active-item{
            margin-top:.1rem;
            overflow: hidden;
        }
        .active-select{
            margin-left:.2rem;
            white-space: nowrap;
            i{
                transition:all linear .3s;
            }
            &.active{
                i{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .loading{
        position:fixed;
        z-index:1000;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(255,255,255,.8);
        .load-box{
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            img{
                width:4rem;
                height:auto;
            }
        }
    }
</style>