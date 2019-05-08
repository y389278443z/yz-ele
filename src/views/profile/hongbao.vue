<template>
    <div class="hongbao">
        <div>
            <div class="img-box">
                <img src="images/hongbao.gif" alt="" class="img100">
            </div>
            <h3>没有红包</h3>
            <p class="marginB3">快去抢几个吧</p>
            <ul class="alignCenter f12">
                <li @click="goHistory">查看历史红包</li>
                <li class="before-separator" @click="hongbaoState">红包说明</li>
            </ul>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    // import {hongbaoList} from "../../api";
    import {getStorage} from "../../utils";

    // const userInfo = 'user_info';

    export default {
        name: 'hongbao',
        methods: {
            goHistory() {
                this.$router.push({name: 'hbHistory'});
            },
            hongbaoState() {
                this.$router.push({name: 'sDetail',params:{urlName: '红包问题'}})
            }
        },
        created() {
            // let userId = JSON.parse(getStorage(userInfo)).user_id;
            //
            // hongbaoList(userId).then(res => {
            //     console.log(res);
            // })
        }
    }
</script>

<style scoped lang="less">
    .marginB3{margin-bottom:.3rem;}
    .hongbao{
        color:#999;
        margin-top:1rem;
        text-align: center;
        .img-box{
            width:4rem;
            height:4rem;
            margin:0 auto;
        }
    }
</style>