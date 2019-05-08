<template>
    <div class="search">
        <header-top :text="text"></header-top>
        <div class="search-top">
            <div class="search-input disFlex">
                <el-input v-model="searchVal" placeholder="请输入商家或美食名称" class="grow1">
                    <i slot="suffix" class="el-input__icon el-icon-close" v-show="searchVal.length > 0" @click="searchVal = ''"></i>
                </el-input>
                <el-button type="primary" class="search-btn" @click="search(searchVal)">搜索</el-button>
            </div>
        </div>
        <div class="search-history" v-show="showHistory">
            <div class="history-title">搜索历史</div>
            <ul class="history-list" v-for="(item, index) in historyList" :key="index">
                <li class="alignItem" @click="search(item)">
                    <span class="grow1 textEllipsis">{{item}}</span>
                    <span class="el-icon-close marginL3" @click.stop="clearItem(index)"></span>
                </li>
            </ul>
            <div class="clear-history" v-if="historyList.length >= 1" @click="clearAll">清空搜索历史</div>
        </div>
        <shop-list :geohash="geohash" :keyword="startSearch" v-if="startSearch"></shop-list>
        <noting v-if="showNoting"></noting>
        <to-top v-show="showToTop"></to-top>
        <foot-bottom></foot-bottom>
    </div>
</template>

<script>
    const HISTORY_SHOP = 'history_shop';



    import headerTop from '@/components/header/header';
    import footBottom from '@/components/footer/footer';
    import noting from '@/components/noting/noting';
    import shopList from '@/components/shoplist/shopList';
    import toTop from '@/components/toTop/toTop';
    import {getStorage, setStorage, removeStorage} from "../../utils";

    export default {
        name: 'search',
        components: {
            headerTop,
            footBottom,
            noting,
            shopList,
            toTop
        },
        data () {
            return {
                text: '搜索',
                searchVal: '',
                geohash: '',
                showNoting: false,
                historyList: [],
                showClear: false,
                showHistory: true,
                startSearch: false,
                showToTop: false
            }
        },
        created() {
            this.geohash = this.$route.params.geohash;
            let list = JSON.parse(getStorage(HISTORY_SHOP));
            if (list) this.historyList = list;
            window.addEventListener('scroll', this.toggleToTop);
        },
        methods: {
            async search(val) {
               if (val) {
                   let storages = JSON.parse(getStorage(HISTORY_SHOP));
                   let already = false;
                   if (!storages) {
                       storages = [];
                   } else {
                       for (let i of storages) {
                           if (val == i) {
                               already = true;
                               break;
                           }
                       }
                   }
                   if (!already) {
                       storages.push(val);
                   }
                   setStorage(HISTORY_SHOP, storages);
                   this.showHistory = false;
                   this.startSearch = val;
               } else {
                   this.$msg({
                       text: '请输入要搜索的内容'
                   })
               }
            },
            clearItem(index) {
                this.historyList.splice(index, 1);
                setStorage(HISTORY_SHOP, this.historyList);
            },
            clearAll() {
                removeStorage(HISTORY_SHOP);
                this.historyList = [];
                this.$msg({
                    text:'清除成功！'
                })
            },
            toggleToTop() {
                this.showToTop = document.documentElement.scrollTop >= 1500 ?  true : false;
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.toggleToTop);
        }
    }
</script>

<style scoped lang="less">
    .padLR2{padding:0 .2rem;}
    .marginL3{margin-left:.3rem;}
    .search-top{
        position:sticky;
        top:1rem;
        left:0;
        right:0;
        background:#fff;
        z-index:2;
        box-shadow: 0 1px 1px #f5f5f5;
    }
    .search-input{
        padding:.2rem;
    }
    .search-btn{
        margin-left:.1rem;
    }
    .history-title{
        padding:.2rem;
        background:#eee;
    }
    .clear-history{
        padding: .3rem 0;
        margin-bottom:1rem;
        text-align: center;
        color:#409EFF;
        font-size:.32rem;
    }
    .history-list,.search-list{
        li{
            padding:.2rem .3rem;
            border-bottom:1px solid #e5e5e5;
        }
    }

</style>