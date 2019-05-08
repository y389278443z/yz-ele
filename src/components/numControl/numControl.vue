<template>
    <div class="num-control flexAlign">
        <transition name="toLeft">
            <div v-show="isShow">
                <span class="el-icon-remove-outline baseC pointer" @click.stop="minus"></span>
                <span class="num">{{amount}}</span>
            </div>
        </transition>
        <el-button size="mini" type="primary" @click.stop="choiceState" v-if="state">选规格</el-button>
        <span class="el-icon-circle-plus baseC pointer" @click.stop="add" v-else></span>
    </div>
</template>

<script>
    export default {
        name: 'numControl',
        props: {
            food: {
                type: Object
            },
            state: {}
        },
        methods: {
            add() {
                if (this.food.count) {
                    this.food.count++;
                } else {
                    if (this.foodList[0].count) {
                        this.foodList[0].count++;
                    } else {
                        this.$set(this.foodList[0], 'count', 1);
                    }
                }
                this.$emit('calculateTotal');
            },
            minus() {
                if (this.food.count) {
                    this.food.count--;
                    this.$emit('calculateTotal');
                } else {
                    if (this.foodList.length > 1) {
                        this.$msg({
                            text: '有规格的商品请在购物车里删除'
                        })
                    } else {
                        this.foodList[0].count--;
                        this.$emit('calculateTotal');
                    }
                }
            },
            choiceState() {
                this.$emit('choice-state', this.food);
            }
        },
        computed: {
            isShow() {
                return this.amount > 0;
            },
            foodList() {
                return this.food.specfoods
            },
            amount() {
                if (this.food.count) {
                    return this.food.count;
                } else {
                    if (this.foodList.length <= 1) {
                        return this.foodList[0].count;
                    } else {
                        let n = 0;
                        this.foodList.forEach(item => {
                            if (item.count) {
                                n += item.count;
                            }
                        });
                        return n;
                    }
                }
            }

        }
    }
</script>

<style scoped lang="less">
    .num-control{
        vertical-align: middle;
        span{
            font-size:.42rem;
            vertical-align: middle;
            line-height:.42rem;
        }
        .num{
            font-size:.3rem;
            margin:0 .1rem;
        }
    }

    .el-button--mini{
        padding:4px 6px;
    }

</style>