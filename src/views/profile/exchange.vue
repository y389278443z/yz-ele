<template>
    <div>
        <header-top :text="text"></header-top>
        <div class="ec-content">
            <el-input v-model="input" placeholder="请输入兑换码" class="ec-input">
                <i slot="suffix" class="el-input__icon el-icon-close" v-show="showClose" @click="clearInput"></i>
            </el-input>
            <el-button type="primary" class="btn" :disabled="!showClose" @click="exchange">兑换</el-button>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'exchange',
        components: {
            headerTop
        },
        data () {
            return {
                text: '兑换红包',
                input: ''
            }
        },
        computed: {
            showClose () {
                return this.input.length > 0
            }
        },
        methods: {
            clearInput() {
                this.input = '';
            },
            exchange() {
                let self = this;
                this.$alert({
                    type: 'error',
                    message: '请通过官方app兑换',
                    success: function() {
                        self.$router.go(-1);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .ec-content {
        padding: 0 .2rem;
        margin-top:.3rem;
    }

    .btn{
        width:100%;
        margin-top:.25rem;
    }
</style>