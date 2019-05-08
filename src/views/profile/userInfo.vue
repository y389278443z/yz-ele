<template>
    <div class="user-info height100">
        <header-top :text="text"></header-top>
        <ul class="info-list">
            <li class="alignItem pr">
                <p class="bold">头像</p>
                <div class="flexAlign">
                    <img src="images/default.png" alt="" class="info-img marginR2">
                    <span class="el-icon-arrow-right c999"></span>
                </div>
                <label for="img-file" class="file-box">
                    <input type="file" id="img-file" @change="choiceImg($event)" ref="file">
                </label>
            </li>
            <li class="alignItem" @click="changeName">
                <p class="bold">用户名</p>
                <div class="flexAlign">
                    <span class="c666 marginR2">y389278443z</span>
                    <span class="el-icon-arrow-right c999"></span>
                </div>
            </li>
            <li class="bgf5f5f5 f12">
                账号绑定
            </li>
            <li class="alignItem" @click="setPhone">
                <p class="flexAlign">
                    <span class="iconfont icon-icon-- f20 baseC"></span>
                    <span class="bold">手机</span>
                </p>
                <div class="flexAlign">
                    <span class="c666 marginR2">{{userMsg.phone || '点击绑定手机'}}</span>
                    <span class="el-icon-arrow-right c999"></span>
                </div>
            </li>
            <li class="bgf5f5f5 f12">
                安全设置
            </li>
            <li class="alignItem" @click="changePwd">
                <p class="bold">登录密码</p>
                <div class="flexAlign">
                    <span class="c666 marginR2">修改</span>
                    <span class="el-icon-arrow-right c999"></span>
                </div>
            </li>
            <li class="cf5 tc marginT3" @click="logOut">
                退出登录
            </li>
        </ul>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getStorage, removeStorage} from "../../utils";

    const userInfo = 'user_info';

    export default {
        name: 'userInfo',
        components: {
            headerTop
        },
        data() {
            return {
                text: '账户信息',
                imgData: new FormData()
            }
        },
        methods: {
            logOut() {
                this.$confirm({
                    message: '确认要退出登录吗？'
                }).then(() => {
                    removeStorage(userInfo);
                    this.$router.push({name: 'login'});
                }).catch(() => {});
            },
            changeName() {
                this.$router.push({name: 'changeUserName'});
            },
            setPhone() {
                this.$alert({
                    message: '请在正规app内设置',
                    type: 'warning'
                })
            },
            changePwd() {
                this.$router.push({name: 'changePwd'});
            },
            choiceImg(e) {
                let file = e.target.files[0];
                this.imgData.append('avatar', file);
                if (/^image/.test(file.type)) {
                    this.$alert({
                        message: '上传成功',
                        type: 'success'
                    })
                } else {
                    this.$msg({
                        text: '请上传图片格式的文件'
                    })
                }
            }
        },
        computed: {
            userMsg() {
                return JSON.parse(getStorage(userInfo))
            }
        }
    }
</script>

<style scoped lang="less">
    .marginR2{margin-right:.2rem;}
    .marginT3{margin-top:.3rem;}
    .info-img{
        width:1.2rem;
        height:1.2rem;
        border-radius: 50%;
    }
    .info-list{
        li{
            padding:.2rem;
            border-bottom:1px solid #f5f5f5;
            background:#fff;
            &.bgf5f5f5{
                background:#f5f5f5;
            }
        }
    }
    .file-box{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        opacity: 0;
    }
</style>