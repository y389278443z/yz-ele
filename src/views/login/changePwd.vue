<template>
    <div>
        <header-top :text="text"></header-top>
        <el-form ref="form" :model="form" class="change-form">
            <el-form-item>
                <el-input v-model="form.name" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.pwd" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.pwd1" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.pwd2" placeholder="请再次输入新密码"></el-input>
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
            <el-form-item>
                <el-button type="primary" class="width100" @click="submitChange">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getCode, changePwd} from "../../api";

    export default {
        name: 'regist',
        components: {
            headerTop
        },
        data () {
            return {
                text: '修改密码',
                form: {
                    name: '',
                    pwd: '',
                    pwd1: '',
                    pwd2: '',
                    code: ''
                },
                codeNumber: ''
            }
        },
        methods: {
            refreshBtn() {
                this.getCodeImg();
            },
            getCodeImg() {
                getCode().then(res => {
                    this.codeNumber = res.img;
                })
            },
            submitChange() {
                let f = this.form;
                if (!f.name || !f.pwd || !f.pwd1 || !f.pwd2 || !f.code) {
                    this.$alert({
                        message: '请填写完整所有信息！',
                        type: 'error'
                    })
                } else if (f.code.length !== 4) {
                    this.$alert({
                        message: '验证码格式不正确！',
                        type: 'error'
                    })
                } else if (f.pwd1 != f.pwd2) {
                    this.$alert({
                        message: '两次密码不一致',
                        type: 'error'
                    })
                } else {
                    changePwd(f.name, f.pwd, f.pwd1, f.pwd2, f.code).then(res => {
                        console.log(res);
                        if (res.status < 0) {
                            this.$alert({
                                type: 'error',
                                message: res.message
                            })
                        } else {
                            this.$msg({
                                text: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        }
                    })
                }
            }
        },
        created() {
            this.getCodeImg();
        }
    }
</script>

<style scoped lang="less">
    .change-form{
        padding:.5rem;
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