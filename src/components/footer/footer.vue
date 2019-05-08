<template>
    <div class="footer flexAlign">
        <div :class="{active: isActive('msite')}">
            <router-link to="/msite">
                <i class="iconfont icon-shouye"></i>
                <p>首页</p>
            </router-link>
        </div>
        <div :class="{active: isActive('search')}">
            <router-link :to="'/search/' + geohash">
                <i class="iconfont icon-faxian"></i>
                <p>发现</p>
            </router-link>
        </div>
        <div :class="{active: isActive('order')}">
            <router-link to="/order">
                <i class="iconfont el-icon-document"></i>
                <p>订单</p>
            </router-link>
        </div>
        <div :class="{active: isActive('profile')}">
            <router-link to="/profile">
                <i class="iconfont icon-geren"></i>
                <p>我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    const GEO_HASH = 'geo_hash';
    const DELAY = 1500;

    import {getStorage} from "../../utils";


    export default {
        name: 'footBottom',
        data() {
            return {
                geohash: ''
            }
        },
        methods: {
            isActive(name) {
                return this.$route.name === name;
            }
        },
        created() {
            let str = getStorage(GEO_HASH);
            if (str) {
                this.geohash = str;
            } else {
                this.$msg({
                    text: '请重新选择地址信息！'
                });
                setTimeout(() => {
                    this.$router.push({name: 'choiceCity'});
                }, DELAY)
            }
        }
    }
</script>

<style scoped lang="less">
    .footer{
        height:1rem;
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        z-index:2;
        background:#fff;
        box-shadow: -1px 0 0 2px #eee;
        justify-content: space-around;
        text-align: center;
        color:#999;
        &>div{
            flex-grow: 1;
            .iconfont{
                font-size:.4rem;
            }
            p{
                font-size:.24rem;
            }
            &.active{
                color:#409EFF;
            }
        }
    }
</style>