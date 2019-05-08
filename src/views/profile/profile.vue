<template>
    <div class="height100">
        <header class="header baseBg alignItem" @click="toInfo">
            <div class="header-info flexAlign">
                <div class="user-img">
                    <img src="images/default.png" alt="" class="img100">
                </div>
                <div v-if="userInfo">
                    <p class="loginBtn">{{userInfo.username}}</p>
                    <p><span class="iconfont icon-shouji"></span><span>{{userInfo.mobile || '暂未绑定手机'}}</span></p>
                </div>
                <div v-else @click.stop="goLogin">
                    <p class="loginBtn">登录/注册</p>
                    <p class="f12"><span >登录后享受更多特权</span></p>
                </div>

            </div>
            <span class="el-icon-arrow-right"></span>
        </header>
        <div class="award tc alignItem">
            <div class="grow1">
                <router-link :to="{name: 'benefit'}">
                    <div class="hongbao">
                        <span class="iconfont icon-hongbao"></span>
                    </div>
                    <p>红包</p>
                </router-link>
            </div>
            <div class="grow1">
                <router-link :to="{name: 'gold'}">
                    <div class="jinbi">
                        <span class="iconfont icon-jinbi"></span>
                    </div>
                    <p>金币</p>
                </router-link>
            </div>
        </div>
        <ul class="profile-list">
           <li class="marginB2">
               <router-link :to="{name: 'address'}" class="alignItem">
                   <div class="flexAlign">
                       <span class="el-icon-location-outline f20"></span>
                       <span class="mLR10">我的地址</span>
                   </div>
                   <span class="el-icon-arrow-right"></span>
               </router-link>
           </li>
            <li class="alignItem borderB" @click="goMall">
                <div class="flexAlign">
                    <span class="el-icon-goods f20"></span>
                    <span class="mLR10">金币商城</span>
                </div>
                <span class="el-icon-arrow-right"></span>
            </li>
            <li class="marginB2">
                <router-link :to="{name: 'share'}" class="alignItem">
                    <div class="flexAlign">
                        <span class="iconfont icon-jinbi f16"></span>
                        <span class="mLR10">分享拿10元现金</span>
                    </div>
                    <span class="el-icon-arrow-right"></span>
                </router-link>
            </li>
            <li class="borderB">
                <router-link class="alignItem" :to="{name: 'download'}">
                    <div class="flexAlign">
                        <span class="el-icon-download"></span>
                        <span class="mLR10">下载吃了吗App</span>
                    </div>
                    <span class="el-icon-arrow-right"></span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'service'}" class="alignItem">
                    <div class="flexAlign">
                        <span class="el-icon-document"></span>
                        <span class="mLR10">服务中心</span>
                    </div>
                    <span class="el-icon-arrow-right"></span>
                </router-link>
            </li>
        </ul>
        <div class="personal baseC">
            <router-link :to="{name:'privacy'}">隐私政策</router-link>
        </div>
        <foot-bottom></foot-bottom>
    </div>
</template>

<script>
    import footBottom from '@/components/footer/footer';
    import {getStorage} from "../../utils";

    const userInfo = 'user_info';

    export default {
        name: 'profile',
        components: {
            footBottom
        },
        methods: {
            goMall() {
                this.$alert({
                    type: 'error',
                    message: '请通过官方app途径进入'
                })
            },
            toInfo() {
                this.$router.push({name: 'userInfo'});
            },
            goLogin() {
                this.$router.push({name: 'login'});
            }
        },
        computed: {
            userInfo() {
                return JSON.parse(getStorage(userInfo));
            }
        }
    }
</script>

<style scoped lang="less">
    .marginB2{margin-bottom:.2rem;}
    .borderB{border-bottom:1px solid #f5f5f5;}
    .header{
        padding:.5rem .2rem;
        color:#fff;
    }
    .user-img{
        margin-right:.2rem;
        img{
            width:1.2rem;
            height:1.2rem;
            border-radius: 50%;
        }
    }
    .loginBtn{
        font-size:.38rem;
        margin-bottom:.1rem;
        font-weight:bold;
    }
    .award{
        background:#fff;
        margin-bottom:.2rem;
        &>div{
            padding:.4rem 0;
            &:first-child{
                border-right:1px solid #e5e5e5;
            }
        }
        .hongbao,.jinbi {
            display: inline-block;
            width:.5rem;
            height:.5rem;
            line-height:.5rem;
            margin-bottom:.1rem;
            color:#fff;
            background:#67C23A;
            border-radius: 50%;
        }
        .hongbao{
            background:#F56C6C;
        }
    }
    .profile-list{
        &>li{
            background:#fff;
            padding:.2rem;
            font-size:.32rem;
        }
    }
    .personal{
        margin-top: .3rem;
        text-align: center;
    }
</style>