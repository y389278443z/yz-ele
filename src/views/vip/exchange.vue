<template>
    <div class="exchange">
        <header-top :text="text"></header-top>
        <div class="disFlex padTBL2">
            <span>关联账号：</span>
            <h3>y389278443z</h3>
        </div>
        <div class="ex-form padLR2">
            <el-input v-model="username" placeholder="请输入10位数卡号" class="marginB1" @input="canClick"></el-input>
            <el-input v-model="password" placeholder="请输入6位数密码" class="marginB2" @input="canClick"></el-input>
        </div>
        <div class="padLR2">
            <el-button type="success" :disabled="isDisabled" @click="exchange">兑换</el-button>
        </div>

        <div class="state c999">
            <h4 class="base-title alignCenter">温馨提示</h4>
            <ul class="f12 padL4">
                <li>新兑换的会员服务，权益以「会员说明」为准。</li>
                <li>月卡：30次减免配送费</li>
                <li>季卡：90次减免配送费</li>
                <li>年卡：360次减免配送费</li>
                <li>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</li>
            </ul>
        </div>


    </div>
</template>

<script>
    const NAMELENGTH = 10;
    const PWDLENGTH = 6;


    import headerTop from '@/components/header/header';

    export default {
        name: 'exchange',
        components: {
            headerTop
        },
        data() {
            return {
                text: '兑换会员',
                username: '',
                password: '',
                isDisabled: true
            }
        },
        methods: {
            canClick() {
                this.isDisabled = !(this.username.length === NAMELENGTH && this.password.length === PWDLENGTH);
            },
            exchange() {
                this.$alert({
                    message: '请通过官方app兑换',
                    type: 'warning'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .padTBL2{ padding: .2rem 0 .2rem .2rem;}
    .padLR2 {padding: 0 .2rem;}
    .padL4{padding-left:.4rem;}
    .marginB1{margin-bottom:.1rem;}
    .marginB2{margin-bottom:.2rem;}
    .el-button{width:100%;}
</style>