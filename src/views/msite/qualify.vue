<template>
    <div class="qualify height100 c999">
        <header-top :text="text"></header-top>
        <div class="content" v-if="shopDetail">
            <h3>食品安全监督公示</h3>
            <div class="flexAlign">
                <img src="images/goodQ.png" alt="" class="qualityImg marginR2">
                <p>检查结果：A</p>
            </div>
            <ul class="notice-list">
                <li>
                    <p class="title">企业名称：</p>
                    <p>{{shopDetail.identification.company_name}}</p>
                </li>
                <li>
                    <p class="title">工商执照注册号：</p>
                    <p>{{shopDetail.identification.licenses_number}}</p>
                </li>
                <li>
                    <p class="title">注册资本：</p>
                    <p>{{shopDetail.identification.registered_number}}</p>
                </li>
                <li>
                    <p class="title">注册地址：</p>
                    <p>{{shopDetail.identification.company_address}}</p>
                </li>
                <li>
                    <p class="title">属地监管所：</p>
                    <p>{{shopDetail.identification.registered_principal}}</p>
                </li>
                <li>
                    <p class="title">法定代表人：</p>
                    <p>{{shopDetail.identification.legal_person}}</p>
                </li>
                <li>
                    <p class="title">经营范围：</p>
                    <p>{{shopDetail.identification.business_scope}}</p>
                </li>
            </ul>
        </div>
        <div class="content">
            <h3>商家从业资格</h3>
            <div class="license-img">
                <div class="img-box">
                    <img :src="imgBaseUrl + 'menu/' + 'q1.png'" alt="" class="img100">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import headerTop from '@/components/header/header';
    import {imgBaseUrl} from "../../utils/env";

    export default {
        name: 'qualify',
        components: {
            headerTop
        },
        data() {
            return {
                text: '营业资格',
                imgBaseUrl
            }
        },
        computed: {
            ...mapGetters([
                'shopDetail'
            ])
        }
    }
</script>

<style scoped lang="less">
    .marginR2{
        margin-right:.2rem;
    }
    .content{
        width:94%;
        box-sizing: border-box;
        margin: .2rem auto 0;
        padding:.2rem;
        background:#fff;
        border-radius: .1rem;
        h3{
            color:#333;
            margin-bottom:.2rem;
        }
    }
    .qualityImg{
        width:.8rem;
        height:.8rem;
    }
    .notice-list{
        margin-top:.2rem;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .2rem .2rem .2rem 0;
            .title{
                max-width: 50%;
                flex-shrink: 0;
            }
        }
    }
    .license-img{
        .img-box{
            display: inline-block;
            width:3rem;
            height:3rem;
        }
    }
</style>