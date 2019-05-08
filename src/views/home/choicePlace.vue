<template>
    <div class="choice-place" v-loading="loading">
        <div class="yz-header baseBg">
            <div class="lc-header">
                <h3>{{cityName}}</h3>
                <span class="header-right-btn" @click="changeCity">切换城市</span>
            </div>
        </div>
        <div class="input-place">
            <el-input placeholder="请输入地址等信息" v-model="simpleAdr">
                <i slot="suffix" class="el-input__icon el-icon-close" v-show="simpleAdr.length > 0" @click="simpleAdr = ''"></i>
            </el-input>
            <el-button type="primary" class="find-place" @click="searchAdr">提交</el-button>
        </div>
        <div class="find-box">
            <div class="header" v-if="showHistory">搜索历史</div>
            <ul class="find-list">
                <li v-for="(item, index) in searchList" :key="index" @click="choicePlace(item)">
                    <div class="textEllipsis">{{item.name}}</div>
                    <div class="address-detail">{{item.address || '其他'}}</div>
                </li>
                <li class="tc" @click="deleteHistory" v-if="showHistory && searchList.length > 0">
                    删除所有
                </li>
            </ul>
            <noting  v-if="showNothing"></noting>
        </div>
    </div>
</template>

<script>
    const HISTORY_PLACE = 'history_place';
    const GEO_HASH = 'geo_hash';
    const LOCATION_NAME = 'location_name';

    import noting from '@/components/noting/noting.vue';
    import {searchPlace} from "../../api";
    import {getStorage, setStorage, removeStorage} from "../../utils";

    export default {
        name: 'choicePlace',
        components: {
            noting
        },
        data() {
            return {
                simpleAdr: '',
                cityName: '',
                loading: false,
                showNothing: false,
                searchList: [],
                showHistory: true
            }
        },
        methods: {
            changeCity() {
                this.$router.back(-1);
            },
            searchAdr() {
                if (!this.simpleAdr) return;
                this.loading = true;
                this.showHistory = false;
                searchPlace(this.cityName, this.simpleAdr).then(res => {
                    let list = res.result ? JSON.parse(res.result) : [];
                    if (list.length <= 0) {
                        this.showNothing = true;
                    }
                    this.searchList = list.results;
                    console.log(this.searchList);
                    this.loading = false;
                })
            },
            choicePlace(place) {
                if (!place.address) {
                    this.$msg({
                        text: '不能选择线路信息，请选择其他地点！'
                    });
                    return;
                }
                let list = [],
                    isRepeat,
                    historyList = getStorage(HISTORY_PLACE),
                    thisGeohash = place.geohash ? place.geohash : place.location.lat + ',' + place.location.lng;
                if (historyList) {
                    list = JSON.parse(historyList);
                    for(let i of list) {
                        if (i.geohash === thisGeohash) {
                            isRepeat = true;
                            break;
                        }
                    }
                }
                if (!isRepeat) {
                    list.push({
                        name: place.name,
                        address: place.address,
                        geohash: thisGeohash,
                        city: place.city
                    });
                    setStorage(HISTORY_PLACE, list);
                }
                setStorage(GEO_HASH, thisGeohash);
                setStorage(LOCATION_NAME, place.name || place.address);
                this.$router.push({name: 'msite'})
            },
            deleteHistory() {
                this.searchList = [];
                removeStorage(HISTORY_PLACE);
            }
        },
        async created() {
            let list = getStorage(HISTORY_PLACE);
            if (list) {
                this.searchList = JSON.parse(list);
            }
            this.cityName = this.$route.params.cityName;
        }
    }
</script>

<style scoped lang="less">
    @borderColor: #e5e5e5;
    .textEllipsis{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    h3{margin:0;}
    .pdLR3{padding:0 .3rem;}
    .input-place{
        padding: .2rem .5rem;
        border-bottom:1px solid @borderColor;
    }
    .find-place{
        width:100%;
        margin-top:.2rem;
        padding: 8px 0;
    }
    .find-box{
        .header{
            padding:.2rem;
            background:#f5f5f5;
        }
        .find-list{
            border-top:1px solid @borderColor;
            border-bottom:1px solid @borderColor;
            li{
                padding:.2rem .4rem;
                border-bottom:1px solid @borderColor;
                &:last-child{
                    border-bottom:none;
                }
                .address-detail{
                    font-size:.24rem;
                    color: #999;
                    margin-top:.1rem;
                    .textEllipsis;
                }
            }
        }
    }
</style>