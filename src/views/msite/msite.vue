<template>
    <div class="msite column">
        <div class="yz-header baseBg">
            <div class="lc-header">
                <span class="el-icon-search header-left-icon" @click="toSearch"></span>
                <span class="textEllipsis search-name" @click="reselectPlace">{{locationName}}</span>
                <span class="header-right-icon el-icon-menu" v-show="false"></span>
                <span class="header-right-btn" v-if="!userInfo">登录/注册</span>
                <span class="iconfont icon-geren f18 gocenter" v-else @click="gotoCenter"></span>
            </div>
        </div>
        <div>
            <div class="food-classify pr">
                <swiper :options="swiperOption" v-if="foodTypes.length">
                    <swiper-slide v-for="(slide, index) in foodTypes" :key="index" class="clear f12">
                        <div class="slide-block" v-for="(block, key) in slide" :key="key" @click="gotoClassify(block.title, block.id)">
                            <img :src="imgBaseUrl +'classify/'+ block.image_url" alt="">
                            <p>{{block.title}}</p>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="msite-box">
                <div class="open-vip alignItem">
                    <div class="vip-text">
                        <img src="images/icons/vip.png" alt="">
                        <span class="f16">超级会员</span>
                        <span class="vip-info">每月领20元会员红包</span>
                    </div>
                    <div>
                        <router-link :to="{name: 'vip'}">立即开通</router-link>
                    </div>
                </div>
                <swiper class="adv-swiper" :options="advOption">
                    <swiper-slide v-for="(adv, index) in advData" :key="index">
                        <img :src="advUrl + 'adv/adv'+(index+1) +'.jpg'" alt="" class="img100">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="base-title alignCenter">
                    推荐商家
                </div>
            </div>
            <shop-list :geohash="geohash" v-if="geohash" isNew="1"></shop-list>
        </div>
        <to-top v-show="showToTop"></to-top>
        <foot-bottom :geohash="geohash"></foot-bottom>
    </div>
</template>

<script>
    const GROUP_lENGTH = 10;
    const GEO_HASH = 'geo_hash';
    const DELAY = 1500;
    const USER_INFO = 'user_info';
    const LOCATION_NAME = 'location_name';


    import footBottom from '@/components/footer/footer';
    import shopList from '@/components/shoplist/shopList';
    import toTop from '@/components/toTop/toTop';
    import {msiteFoodTypes} from "../../api";
    import {imgBaseUrl} from "../../utils/env";
    import {getStorage} from "../../utils";

    import 'swiper/dist/css/swiper.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';


    export default {
        name: 'msite',
        components: {
            footBottom,
            shopList,
            toTop,
            swiper,
            swiperSlide
        },
        data () {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    observe: true,
                    observeParents:true
                },
                advData: ['adv1', 'adv2', 'adv3'],
                advOption: {
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                locationName: '',
                geohash: '',
                foodTypes: [],
                showToTop: false,
                userInfo: null,
                imgBaseUrl

            }
        },
        created() {
            this.userInfo = getStorage(USER_INFO);
            let str = getStorage(GEO_HASH);
            this.locationName = getStorage(LOCATION_NAME);
            if (str) {
                this.geohash = str;
                msiteFoodTypes().then(res => {
                    let types = res;
                    for (let i = 0, j = 0,len = types.length; i < len; i += GROUP_lENGTH, j++) {
                        this.$set(this.foodTypes, j, types.splice(0, GROUP_lENGTH));
                    }
                })
            } else {
                this.$msg({
                    text: '请重新选择地址信息！'
                });
                setTimeout(() => {
                    this.$router.push({name: 'choiceCity'});
                }, DELAY)
            }

        },
        mounted() {
            window.addEventListener('scroll', this.toggleToTop)
        },
        computed: {
            advUrl() {
                return imgBaseUrl;
            }
        },
        methods: {
            toggleToTop() {
                this.showToTop = document.documentElement.scrollTop >= 1500 ?  true : false;
            },
            gotoClassify(title, id) {
                this.$router.push({name: 'shopClassify', query: {title, id}})
            },
            toSearch() {
                this.$router.push({path: `search/${this.geohash}`});
            },
            reselectPlace() {
                this.$router.push({name: 'choiceCity'});
            },
            gotoCenter() {
                this.$router.push({name: 'profile'});
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.toggleToTop);
        }
    }
</script>

<style scoped lang="less">
    .food-classify{
        height:4.3rem;
    }
    .search-name{
        width: 55%;
        display: inline-block;
    }
    .slide-block{
        width:20%;
        float:left;
        text-align: center;
        margin:.2rem 0;
        img{
            width:1rem;
            height:1rem;
        }
    }
    .msite-box{
        padding:0 .2rem;
    }
    .open-vip{
        padding: .2rem;
        margin-bottom:.1rem;
        border-radius: .1rem;
        background-image: linear-gradient(90deg,#ffefc4,#f3dda0);
        img{
            width:.36rem;
            height:.36rem;
            vertical-align: middle;
            margin-right:.1rem;
        }
        .vip-text{
            span{
                vertical-align: middle;
            }
            .vip-info{
                &:before{
                    content: "\B7";
                    font-weight: 700;
                    margin: .1rem;
                }
            }
        }
    }
    .gocenter{
        position:absolute;
        top:0;
        right:.2rem;
    }

</style>
<style lang="less">
    .adv-swiper{
        .swiper-pagination{
            bottom:4px;
            .swiper-pagination-bullet{
                width:10px;
                height:2px;
                border-radius: 2px;
            }
        }
    }
    .food-classify{
        .swiper-container{
            padding-bottom:.8rem;
        }
    }
</style>