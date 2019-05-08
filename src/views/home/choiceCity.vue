<template>
    <div class="choice-city" v-loading="loading">
        <div class="yz-header baseBg">
            <div class="alignItem base-format">
                <span>吃了吗</span>
                <div @click="goLogin" v-if="!userInfo"> <span>登录</span>/<span>注册</span></div>
                <span class="iconfont icon-geren f18" v-else @click="gotoCenter"></span>
            </div>
        </div>
        <nav class="cc-nav alignItem">
            <span>当前定位城市：</span>
            <span class="location-notice">定位不准时，请在城市列表中选择</span>
        </nav>
        <div class="cc-nav alignItem" @click="goPlace(nowCity.name)">
            <span class="f16 baseC">{{nowCity.name}}</span>
            <span class="el-icon-arrow-right"></span>
        </div>
        <section class="city-group">
            <h5>热门城市</h5>
            <ul class="group-list clear">
                <li v-for="item in hotCities" :key="item.id" @click="goPlace(item.name)">{{item.name}}</li>
            </ul>
        </section>
        <section class="city-group" v-for="(item, index) in keyArr" :key="index">
            <div class="topic">{{item}}<span class="f12" v-if="index === 0">(按字母排序)</span></div>
            <ul class="group-list clear">
                <li v-for="(val, key) in allCities[item]" :key="key" @click="goPlace(val.name)">
                    {{val.name}}
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {allCity, ownLocation, hotCity} from "../../api";
    import {getStorage, setStorage} from "../../utils";


    const USER_INFO = 'user_info';
    const CITY_NAME = 'city_name';

    export default {
        name: 'choiceCity',
        data() {
            return {
                nowCity: {},
                nowCityId: '',
                hotCities: [],
                allCities: {},
                loading: true,
                userInfo: null
            }
        },
        methods: {
            goLogin() {
                this.$router.push({name: 'login'})
            },
            goPlace(name) {
                const uriName = decodeURI(name);
                setStorage(CITY_NAME, name);
                this.$router.push({path: `choicePlace/${uriName}`});
            },
            gotoCenter() {
                this.$router.push({name: 'profile'});
            }
        },
        async created() {
            this.userInfo = getStorage(USER_INFO);
            this.nowCity = await ownLocation();
            let hotCities = await hotCity();
            this.hotCities = hotCities.status == 1 ? hotCities.result : [];
            this.allCities = await allCity();
            this.loading = false;
        },
        computed: {
            keyArr() {
                return Object.keys(this.allCities).sort()
            }
        }
    }
</script>

<style lang="less" scoped>
    @borderColor:#e5e5e5;
    @baseColor:#409eff;
    .pdLR3{padding:0 .3rem;}
    .f12{font-size:.24rem;}
    .cc-nav{
        height:1rem;
        line-height:1rem;
        .pdLR3;
        border-bottom:1px solid @borderColor;
    }
    .location-notice{
        .f12;
        color:#999;
    }
    .city-group{
        margin-top:.3rem;
        padding:0 .2rem;
        h5,.topic{
            margin:0;
            padding:.1rem .3rem;
            background:@baseColor;
            color:#fff;
            .f12;
        }
        .topic{
            font-size:.3rem;
        }
        .group-list{
            border:1px solid @borderColor;
            border-bottom-color:transparent;
            &:last-child{
                margin-bottom:.3rem;
            }
            li{
                color:@baseColor;
                width:25%;
                float:left;
                box-sizing:border-box;
                padding:.2rem .1rem;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border-right:1px solid @borderColor;
                border-bottom:1px solid @borderColor;
                &:nth-child(4n + 4) {
                    border-right:none;
                }
            }
        }
    }
</style>