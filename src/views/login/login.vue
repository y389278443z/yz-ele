<template>
    <div class="login">
        <header-top :text="topic"></header-top>

        <el-form ref="form" :model="form" class="login-form">
            <el-form-item>
                <el-input v-model="form.name" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="form.pwd" placeholder="请输入密码" :type="showPwd ? 'text' : 'password' "></el-input>
                <span class="iconfont icon-eye switch-pwd" :class="{baseC: showPwd}" @click="changePwdState"></span>
            </el-form-item>
            <el-form-item class="pr">
                <el-input
                        placeholder="请输入验证码"
                        v-model="form.code"
                        class="code-input"
                >
                </el-input>
                <div class="code-info alignCenter">
                    <img :src="codeNumber" alt="">
                    <div class="fresh-btn" @click="refreshBtn">
                        <p class="c999">看不清</p>
                        <p class="baseC">换一张</p>
                    </div>
                </div>
            </el-form-item>
            <div class="cf5 f12">
                <p>温馨提示：未注册过的账号，登录时将自动注册</p>
                <p>注册过的用户可凭账号密码登录</p>
            </div>
            <el-form-item>
                <el-button type="primary" class="width100" @click="loginIn">登录</el-button>
            </el-form-item>
            <div class="tr underLine">
                <router-link to="changePwd" class="baseC">修改密码</router-link>
            </div>
        </el-form>

    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getCode, login} from "../../api";
    import {setStorage} from "../../utils";

    export default {
        name: 'login',
        components: {
            headerTop
        },
        data () {
            return {
                form: {
                    code: '',
                    name: '',
                    pwd: ''
                },
                topic:'登录',
                showPwd: false,
                codeNumber: '',
                beforePath: '/'
            }
        },
        methods: {
            getCodeImg() {
                getCode().then(res => {
                    if (res.status == 1) {
                        this.codeNumber = res.img;
                    }
                })
            },
            changePwdState() {
                this.showPwd = !this.showPwd;
            },
            loginIn() {
                let form = this.form;
                console.log(form)
                if (form.code && form.name && form.pwd && form.code.length === 4) {
                    login(form.name, form.pwd, form.code).then( res => {
                        console.log(res);
                        if (res.message) {
                            this.$alert({
                                type: 'error',
                                message: res.message
                            })
                        } else {
                            setStorage('user_info', res);
                            this.$router.push({path: this.beforePath});
                        }
                    })
                } else {
                    this.$msg({
                        text: '格式错误！'
                    })
                }
            },
            refreshBtn() {
                this.getCodeImg();
            }
        },
        created() {
            this.getCodeImg();
            let query = this.$route.query;
            if (query && query.path) {
                this.beforePath = query.path;
            }
        }
    }
</script>

<style scoped lang="less">
    .login-form{
        padding:.5rem;
    }
    .switch-pwd {
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        right:0;
        padding:0 .2rem;
        font-size:.5rem;
        color:#999;
        &.baseC{ color:#409EFF;}
    }
    .code-input{
        width:50%;
    }
    .code-info{
       position:absolute;
        width:50%;
        top:0;
        right:0;
        height:100%;
    }
    .fresh-btn{
        line-height:1.2em;
        font-size:.28rem;
    }
</style>