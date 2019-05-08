<template>
    <div class="shop-classify">
        <header-top :text="title"></header-top>
        <div class="nav-container">
            <ul class="nav disFlex tc">
                <li class="grow1" @click="choiceType('food')" :class="{active: showType == 'food'}">
                    商家<span class="el-icon-caret-bottom icon"></span>
                </li>
                <li class="grow1" @click="choiceType('sort')" :class="{active: showType == 'sort'}">
                    排序<span class="el-icon-caret-bottom icon"></span>
                </li>
                <li class="grow1" @click="choiceType('filter')" :class="{active: showType == 'filter'}">
                    筛选<span class="el-icon-caret-bottom icon"></span>
                </li>
            </ul>

            <transition enter-active-class="show" leave-active-class="hide">
                <div class="nav-detail" v-show="showType" @click="showType = ''">
                    <div class="all-choice f12 disFlex" v-show="showType == 'food'">
                        <ul class="choice-left shrink0">
                            <li class="alignItem" v-for="(item, index) in kinds" :key="index" @click.stop="getRightList(item.id, item.sub_categories)" :class="{active: kindIndex == item.id}">
                                <div class="flexAlign">
                                    <img :src="imgBaseUrl + 'category/' + item.image_url" alt="">
                                    <span>{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="amount">{{item.count}}</span>
                                    <span class="el-icon-arrow-right"></span>
                                </div>
                            </li>
                        </ul>
                        <ul class="choice-right grow1 shrink0">
                            <li class="alignItem" v-for="(item, index) in rightList" :key="index" @click="getRestaurantId(item)">
                                <span>{{item.name}}</span>
                                <span v-if="item.level == 2">{{item.count}}</span>
                            </li>
                        </ul>
                    </div>
                    <ul class="sort-list" v-show="showType == 'sort'">
                        <li @click="sortClick(1)" :class="{active: sortIndex == 1}">
                            <div>
                                <span class="el-icon-sort icon baseC"></span>
                                <span>智能排序</span>
                            </div>
                            <span class="el-icon-check"></span>
                        </li>
                        <li @click="sortClick(2)" :class="{active: sortIndex == 2}">
                            <div>
                                <span class="el-icon-location-outline icon ce6"></span>
                                <span>离我最近</span>
                            </div>
                            <span class="el-icon-check"></span>
                        </li>
                        <li @click="sortClick(3)" :class="{active: sortIndex == 3}">
                            <div>
                                <span class="el-icon-upload2 icon c67"></span>
                                <span>销量最高</span>
                            </div>
                            <span class="el-icon-check"></span>
                        </li>
                        <li @click="sortClick(4)" :class="{active: sortIndex == 4}">
                            <div>
                                <span class="iconfont icon-jinbi icon cf5"></span>
                                <span>起送价最高</span>
                            </div>
                            <span class="el-icon-check"></span>
                        </li>
                        <li @click="sortClick(5)" :class="{active: sortIndex == 5}">
                            <div>
                                <span class="el-icon-star-off ce6 icon"></span>
                                <span>评分最高</span>
                            </div>
                            <span class="el-icon-check"></span>
                        </li>
                    </ul>
                    <div class="filter" v-show="showType == 'filter'">
                        <div class="delivery">
                            <h4>配送方式</h4>
                            <ul class="filter-list clear">
                                <li @click.stop="deliveryClick" :class="{active: choiceDelivery}">
                                    <span class="el-icon-sold-out icon"></span>
                                    <span>蜂鸟快送</span>
                                </li>
                            </ul>
                        </div>
                        <div class="shop-kind">
                            <h4>商家属性</h4>
                            <ul class="filter-list clear">
                                <li  class="ce6" @click.stop="supportClick" :class="{active: isNewShop}">
                                    <span class="icon name-icon">新</span>
                                    <span>新店</span>
                                </li>
                            </ul>
                        </div>
                        <div class="choice-btn alignItem">
                            <el-button type="primary" @click="clearAll">清空</el-button>
                            <el-button type="success" @click="submitAll">确定</el-button>
                        </div>
                    </div>
                </div>
            </transition>

        </div>
        <shop-list :geohash="geohash" :kind="kind" :isNear="isNear" :sort_by="sort_by" :isNew="isNew" :confirmStatus="confirmStatus" v-if="getList"></shop-list>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import shopList from '@/components/shoplist/shopList';
    import {imgBaseUrl} from "../../utils/env";
    import {getStorage} from "../../utils";

    const GEO_HASH = 'geo_hash';


    import {shopKind} from "../../api";

    export default {
        name: 'shopClassify',
        components: {
            headerTop,
            shopList
        },
        data() {
            return {
                text: '',
                geohash: '',
                id: '',
                title: '',
                kind: '',
                kinds: [],
                rightList: [],
                kindIndex: undefined,
                getList: false,
                showType: '',
                sortIndex: '',
                sort_by: '',
                isNear: '',
                choiceDelivery: false,
                confirmStatus: false,
                imgBaseUrl,
                isNewShop: false
            }
        },
        async created() {
            let query = this.$route.query;
            ({title: this.title, id: this.id } = query);
            this.changeKind(this.id);
            this.geohash = getStorage(GEO_HASH);
            this.kinds = await shopKind();
            if (this.id) {
                this.kinds.forEach(item => {
                    item.sub_categories.forEach(val => {
                        if (val.id == this.id) {
                            this.kindIndex = item.id;
                            this.rightList = item.sub_categories;
                        }
                    })
                });
            }
            this.getList = true;
        },
        methods: {
            getRightList(id, list) {
                this.kindIndex = id;
                this.rightList = list;
            },
            getRestaurantId(item) {
                this.title = item.name;
                this.changeKind(item.id);
            },
            choiceType(type) {
                if (this.showType != type) {
                    this.showType = type;
                } else {
                    this.showType = '';
                }
            },
            sortClick(n) {
                this.sortIndex = n;
                if (n == 2) {
                    this.isNear = 2;
                } else {
                    this.isNear = 1;
                    switch (n) {
                        case 1:
                            this.sort_by = '';
                            break;
                        case 3:
                            this.sort_by = 'recent_order_num';
                            break;
                        case 4:
                            this.sort_by = 'float_minimum_order_amount';
                            break;
                        case 5:
                            this.sort_by = 'rating';
                            break;
                    }
                }
            },
            deliveryClick() {
                this.choiceDelivery = !this.choiceDelivery;
            },
            supportClick() {
                this.isNewShop = !this.isNewShop;
            },
            clearAll() {
                this.delivery_active = false;
                this.confirmStatus = !this.confirmStatus
            },
            submitAll() {
                console.log(this.isNew);
                this.confirmStatus = !this.confirmStatus;
            },
            changeKind(id) {
                switch (parseInt(id)) {
                    case 1:this.kind = '美食';break;
                    case 2: this.kind = '超市'; break;
                    case 3: this.kind = '水果'; break;
                    case 4: this.kind = '医'; break;
                    case 5: this.kind = '鲜花'; break;
                    case 6: this.kind = '跑腿'; break;
                    case 7: this.kind= '汉堡'; break;
                    case 8: this.kind = '菜品'; break;
                    case 9: this.kind = '炸鸡'; break;
                    case 10: case 13: this.kind = '地方';break;
                    case 12: case 17: this.kind = '快餐';break;
                    case 14: this.kind= '大牌'; break;
                    case 15: this.kind = '面'; break;
                    case 16: this.kind = '粥';break;
                }
            }
        },
        computed: {
            isNew() {
                return this.isNewShop ? '0' : '';
            }
        }
    }
</script>

<style scoped lang="less">
    .heightAuto{
        height:7.5rem;
        overflow-y: auto;
    }
    .nav-container{
        position:sticky;
        top:1rem;
        left:0;
        z-index:2;
    }
    .nav{
        border-bottom:1px solid #eee;
        background:#fff;
        padding: 0.2rem 0;

        li{
            border-right:1px solid #eee;
            &:last-child{
                border-right:none;
            }
            .icon{
                transition: all linear .2s;
            }
            &.active{
                color:#409EFF;
                .icon{
                    transform: rotate(180deg);
                    transition: all linear .2s;
                }
            }
        }
    }
    .nav-detail{
        position:absolute;
        top:100%;
        left:0;
        right:0;
        height:calc(100vh - 1.8rem);
        background:rgba(0,0,0,.3);
    }
    .all-choice{
        box-shadow: 0 1px 2px #e5e5e5;
    }
    .choice-left{
        background:#f5f5f5;
        width:50%;
        .heightAuto;
        li{
            padding: .25rem;
            border-bottom:1px solid transparent;
            &.active{
                background:#fff;
            }
            img{
                width:.3rem;
                height:.3rem;
                margin-right:.2rem;
            }
        }
        .amount{
            background:#ccc;
            border-radius: .1rem;
            padding: 0 .1rem;
            color:#fff;
        }
    }
    .choice-right{
        width:50%;
        background:#fff;
        .heightAuto;
        padding: 0 .25rem;
        box-sizing: border-box;
        li{
            padding: .25rem 0;
            border-bottom:1px solid #f5f5f5;
        }
    }
    .sort-list{
        background:#fff;
        padding:0 .25rem;
        li{
            padding:.25rem;
            border-bottom:1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
                margin-right:.2rem;
            }
            .el-icon-check{
                display: none;
            }
            &.active{
                color:#409EFF;
                .el-icon-check{
                    display: inline-block;
                }
            }
        }
    }
    .filter{
        background:#fff;
        h4{
            padding: .2rem;
        }
    }
    .filter-list{
        padding: 0 .2rem;
        li{
            float:left;
            padding:0 .1rem;
            box-sizing: border-box;
            width:30%;
            margin-right:5%;
            margin-bottom:.1rem;
            height:.6rem;
            line-height:.6rem;
            border:1px solid #e5e5e5;
            border-radius: .05rem;
            font-size:.24rem;
            &:nth-child(3n + 3) {
                margin-right:0;
            }
            .icon{
                margin-right:.1rem;
            }
            &.active{
                background:#409EFF;
                color:#fff;
                span{
                    color:#fff;
                }
            }
        }
    }
    .choice-btn{
        background:#f1f1f1;
        padding:.15rem .2rem;
    }
    .el-button{
        width:100%;
    }
    .name-icon{
        padding: 0 .05rem;
        border:1px solid currentColor;
        border-radius: 2px;
    }
    @keyframes showing {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes hiding {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }
    .duration800{
        animation-duration: .8s;
    }
    .show{
        animation-name: showing;
        .duration800;
    }
    .hide{
        animation-name: hiding;
        .duration800;
    }
</style>