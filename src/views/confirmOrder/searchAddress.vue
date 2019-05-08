<template>
    <div class="searchAddress">
        <header-top :text="text"></header-top>
        <div class="searchContent">
            <div class="flexAlign">
                <el-input v-model="address" placeholder="请输入小区/写字楼/学校等"></el-input>
                <el-button type="primary" class="search-btn" @click="search">搜索</el-button>
            </div>
            <ul class="search-list" v-if="list.length > 0">
                <li @click="choiceAddress(item.address)" v-for="(item, index) in list" :key="index">
                    <h4 class="title">{{item.name}}</h4>
                    <p class="f12 c999">{{item.address}}</p>
                </li>
            </ul>
            <div class="no-search tc c999 f12" v-show="showNoting">
                <p>找不到地址？</p>
                <p>尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号等），可稍后输入</p>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {searchPlace} from "../../api";
    import {getStorage} from "../../utils";

    const CHOICED_ADDRESS = 'CHOICED_ADDRESS';
    const CITY_NAME = 'city_name';

    export default {
        name: 'searchAddress',
        components: {
            headerTop
        },
        data() {
            return {
                text: '搜索地址',
                address: '',
                list: [],
                showNoting: false,
                cityName: null
            }
        },
        created() {
            let name = getStorage(CITY_NAME);
            if (name) {
                this.cityName = name;
            } else {
                this.$confirm({
                    message: '请重新选择城市！',
                    type: 'error',
                    success:() => {
                        this.$router.push({name: 'choiceCity'});
                    }
                })
            }
        },
        methods: {
            choiceAddress(name) {
                this.$store.commit(CHOICED_ADDRESS, name);
                this.$router.go(-1);
            },
            search() {
                if (!this.address) {
                    this.$msg({ text: '请输入要查询的内容'})
                } else {
                    searchPlace(this.cityName, this.address).then(res => {
                        let result = JSON.parse(res.result).results;
                        this.showNoting = result.length > 0 ? false :true;
                        this.list = result;
                    }).catch(err => {
                        this.$msg({
                            text: err
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .searchContent{
        padding:.2rem;
    }
    .search-btn{
        margin-left:.1rem;
    }
    .search-list{
        &>li{
            padding:.25rem 0;
            border-bottom:1px solid #f5f5f5;
        }
    }
    .no-search{
        margin-top: 1rem;
    }
    .searchAddress {
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        overflow-y: auto;
    }
</style>