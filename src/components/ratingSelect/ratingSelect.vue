<template>
    <div class="f12">
        <ul class="rating-select clear">
            <li v-for="(desc, index) in ratingDesc" :key="index" :class="[descClass(desc.unsatisfied), activeClass(desc.name)]" @click="changeType(desc.name)">{{desc.name}}<span v-if="desc.count>0">({{desc.count}})</span></li>
        </ul>
        <div class="switch" :class="{active: onlyContent}" @click="toggleContent">
            <span class="el-icon-success icon"></span>
            <span>只看有内容的评论</span>
        </div>
    </div>
</template>

<script>
    const All = 1;

    export default {
        name: 'ratingSelect',
        props: {
            ratingDesc: {
                type: Array,
                default: []
            },
            rating: {
                type: Array,
                default: []
            },
            selectType: {},
            onlyContent: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            descClass(type) {
                if (type) {
                    return 'badMsg';
                }
            },
            activeClass(name) {
                if (this.selectType == name) {
                    return 'active';
                }
            },
            changeType(name) {
                this.$emit('change-type', name)
            },
            toggleContent() {
                this.$emit('toggle-content')
            }
        },
        computed: {

        }
    }
</script>

<style scoped lang="less">
    .rating-select{
        border-bottom:1px solid #f5f5f5;
        li{
            float:left;
            padding: .1rem .2rem;
            color:#666;
            background:#ebf5ff;
            margin:0 .1rem .2rem;
            border-radius: .1rem;
            cursor: pointer;
            &.badMsg{
                background:#f5f5f5;
                color:#aaa;
                &.active{
                    background:#bbb;
                    color:#fff;
                }
            }
            &.active{
                background:#409EFF;
                color:#fff;
            }
        }
    }
    .switch{
        padding:.2rem 0;
        .icon{
            margin-right:.1rem;
        }
        color:#999;
        &.active{
            .icon{
                color:#409EFF;
            }
        }
    }
</style>