<template>
    <div>
        <header-top :text="text"></header-top>
        <div class="change-name">
            <el-input v-model="input" placeholder="请输入用户名"></el-input>
            <p class="f12 c999 padTB2">用户名只能修改一次（5-24个字符之间）</p>
            <el-button type="primary" @click="confirmChange">确认修改</el-button>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'changeUserName',
        components: {
            headerTop
        },
        data() {
            return {
                text: '修改用户名',
                input: ''
            }
        },
        methods: {
            confirmChange() {
                if (/^\S{5,24}$/.test(this.input)) {

                } else {

                }
            }
        }
    }
</script>

<style scoped lang="less">
    .change-name{
        padding: .25rem;
    }
    .el-button{
        width:100%;
    }
    .padTB2{ padding: .2rem 0;}
</style>