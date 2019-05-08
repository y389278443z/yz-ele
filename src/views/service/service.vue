<template>
    <div class="rule">
        <header-top :text="text"></header-top>
        <ul class="service-list flexAlign tc">
            <li class="grow1" @click="onlineService">
                <span class="el-icon-service cf5"></span>
               <p>在线客服</p>
            </li>
            <li class="grow1" @click="goCell">
                <span class="el-icon-phone-outline baseC"></span>
                <p>电话客服</p>
            </li>
        </ul>
        <div class="service-topic">
            热门问题
        </div>
        <div class="tree">
            <tree-item v-for="(item, index) in treeData" :key="index" :informate="item" ></tree-item>
        </div>
        <router-view></router-view>

    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import treeItem from '@/components/tree/tree-node.vue';

    export default {
        name: 'rules',
        components: {
            headerTop,
            treeItem
        },
        data() {
            return {
                text:'服务中心',
                showDetail: false,
                treeData: [
                    {
                        name: '常见问题',
                        children: [
                            {
                                name: '签到规则',
                                url: 'login'
                            },
                            {
                                name: '用户等级说明',
                                url: 'profile'
                            },
                            {
                                name: '准时达问题',
                                url: 'profile'
                            },
                            {
                                name: '补签规则',
                                url: 'profile'
                            },
                            {
                                name: '支付问题',
                                url: 'profile'
                            },
                            {
                                name: '免责声明',
                                url: 'profile'
                            },
                            {
                                name: '匿名购买',
                                url: 'profile'
                            },
                            {
                                name: '其他问题',
                                url: 'profile'
                            }
                        ]
                    },
                    {
                        name: '会员问题',
                        children: [
                            {
                                name: '会员问题',
                                url: 'profile'
                            },
                            {
                                name: '会员说明',
                                url: 'profile'
                            },
                            {
                                name: '超级会员权益说明',
                                url: 'profile'
                            }
                        ]
                    },
                    {
                        name: '优惠问题',
                        children: [
                            {
                                name: '优惠说明',
                                url: 'profile'
                            },
                            {
                                name: '金币问题',
                                url: 'profile'
                            },
                            {
                                name: '红包问题',
                                url: 'profile'
                            },
                            {
                                name: '代金券说明',
                                url: 'profile'
                            }
                        ]
                    },
                    {
                        name: '活动说明',
                        children: [
                            {
                                name: '活动说明',
                                url: 'profile'
                            },
                            {
                                name: '活动问题',
                                url: 'profile'
                            },
                            {
                                name: '活动细则',
                                url: 'profile'
                            }
                        ]
                    },
                    {
                        name: '商务问题',
                        children: [
                            {
                                name: '超赞商家',
                                url: 'profile'
                            },
                            {
                                name: '商务合作',
                                url: 'profile'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            goCell() {
                window.location.href = 'tel:10105757';
            },
            onlineService() {
                this.$alert({
                    message: '请通过正经的途径在线咨询',
                    type: 'warning'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @borderC: #f5f5f5;
    [class^=el-icon-]{
        font-size:.48rem;
        margin-bottom:.1rem;
    }
    .service-list{
        border-bottom:1px solid @borderC;
        li{
            padding:.5rem 0;
            height:100%;
            &:first-child{
                border-right:1px solid @borderC;
            }
        }
    }
    .service-topic{
        padding:.2rem;
        background:@borderC;
    }
    .tree{
        padding:10px;
        &>.tree-item{
            border-bottom:1px solid #f5f5f5;
        }
    }
</style>