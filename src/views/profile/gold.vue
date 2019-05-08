<template>
    <div>
        <header-top :text="text"></header-top>
        <div class="gold-box baseBg">
            <div class="gold-info">
                <div class="disFlex top">
                    <div>
                        <span class="c999">当前金币</span>
                        <p><span class="f30">2</span></p>
                    </div>
                    <p class="baseC" @click="goldState"><i class="el-icon-question"></i>金币说明</p>
                </div>
                <div class="pad2">
                    <el-button type="danger" class="width100" @click="gotoMall">金币兑换商品</el-button>
                </div>
            </div>
        </div>
        <div>
            <p class="title">最近30天积分记录</p>
            <ul class="gold-list pad2">
                <li class="alignItem">
                    <h4>普通点餐<span class="ce6">+1</span></h4>
                    <span class="c999">2019-3-1</span>
                </li>
                <li class="alignItem">
                    <h4>普通点餐<span class="ce6">+1</span></h4>
                    <span class="c999">2019-2-26</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    export default {
        name: 'gold',
        components: {
            headerTop
        },
        data() {
            return {
                text: '我的金币'
            }
        },
        methods: {
            gotoMall() {
                this.$alert({
                    type: 'error',
                    message: '金币不足，快去下单赚取大量金币吧！'
                });
            },
            goldState() {
                this.$router.push({name: 'sDetail',params:{urlName: '金币问题'}})
            }
        }
    }
</script>

<style scoped lang="less">
    .pad2{padding:.2rem;}
    .f30{font-size:.6rem;}
    .gold-box{
        padding:.2rem .1rem;
        .gold-info{
            border-radius: .1rem;
            background:#fff;
        }
        .top{
            justify-content: space-between;
            .pad2;
        }
    }
    .title{
        background:#f5f5f5;
        .pad2;
    }
    .gold-list{
        padding:0 .2rem;
        li{
            padding: .2rem 0;
            border-bottom:1px solid #e5e5e5;
        }
    }
</style>