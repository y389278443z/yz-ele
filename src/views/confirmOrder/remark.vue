<template>
    <div>
        <header-top :text="text"></header-top>
        <div class="content">
            <h3>快速备注</h3>
            <ul class="remark-list clear">
                <li v-for="(item, index) in list" :key="index" :class="{active: active1==index}" @click="active1=index">
                    {{item}}
                </li>
            </ul>
            <ul class="remark-list clear">
                <li v-for="(item, index) in list1" :key="index" :class="{active: active2==index}" @click="active2=index">
                    {{item}}
                </li>
            </ul>
            <ul class="remark-list clear">
                <li v-for="(item, index) in list2" :key="index" :class="{active: active3==index}" @click="active3=index">
                    {{item}}
                </li>
            </ul>
            <h3>其他备注</h3>
            <el-input type="textarea" v-model="remark" class="remark-input" placeholder="请输入其他的备注信息"></el-input>
            <el-button type="primary" class="remark-btn" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';

    const REMARK_INFO = 'REMARK_INFO';

    export default {
        name: 'remark',
        components: {
            headerTop
        },
        data() {
            return {
                text: '订单备注',
                list: ['不要辣','少点辣','多点辣'],
                list1: ['不要香菜','不要洋葱','多点醋','多点葱'],
                list2: ['去冰','少冰','多冰'],
                remark: '',
                active1: -1,
                active2: -1,
                active3: -1
            }
        },
        methods: {
            submit() {
                let arr = [];
                if (this.active1 >= 0) arr.push(this.list[this.active1]);
                if (this.active2 >= 0) arr.push(this.list1[this.active2]);
                if (this.active3 >= 0) arr.push(this.list2[this.active3]);
                if (this.remark) arr.push(this.remark);
                this.$store.commit('REMARK_INFO', arr);
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    .content{
        padding: .2rem;
    }
    .remark-list{
        margin:.2rem 0;
        li{
            float:left;
            margin-right:.2rem;
            margin-bottom:.1rem;
            width: 1.5rem;
            height:.6rem;
            line-height:.6rem;
            border:1px solid #409EFF;
            border-radius: .1rem;
            text-align: center;
            &.active{
                background:#409EFF;
                color:#fff;
            }
        }
    }
    .remark-input{
        margin-top:.2rem;
        border-color:#409EFF;
    }
    .remark-btn{
        width:100%;
        margin-top:.4rem;
    }
</style>