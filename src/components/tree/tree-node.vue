<template>
    <div class="tree-item">
        <div class="tree-title" @click="toggle">
            <span>{{informate.name}}</span>
            <span class="el-icon-arrow-right right" v-if="canFold" :class="{active: open}"></span>
        </div>
        <transition enter-active-class="slideInDown" leave-active-class="slideInUp">
            <ul class="tree-content" v-if="open">
                <li>
                    <tree-item v-for="(item, index) in informate.children" :key="index" :informate="item">
                    </tree-item>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'treeItem',
        props: {
            informate: Object
        },
        data() {
            return {
                open: false
            }
        },
        computed: {
            canFold() {
                return this.informate.children && this.informate.children.length
            }
        },
        methods: {
            toggle() {
                if (this.canFold) {
                    this.open = !this.open;
                }
                if (this.informate.url) {
                    this.$router.push({name: 'sDetail',params:{urlName: this.informate.name,url: this.informate.url}})
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .tree-title{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:10px 0;
    }
    .tree-content .tree-item{
        padding-left:20px;
    }
    .item-icon{
        margin-right:10px;
    }
    .right.active,.right{
        transition: all linear .2s;
    }
    .right.active{
        transform:rotate(90deg);
    }

    @keyframes slideInDown {
        from {
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }

        to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    .slideInDown {
        animation-name: slideInDown;
        animation-duration: .3s;
    }

    @keyframes slideInUp {
        from {
            transform: translate3d(0, 0, 0);
            opacity:1;
        }

        to {
            transform: translate3d(0, -20px, 0);
            opacity: 0;
        }
    }

    .slideInUp {
        animation-name: slideInUp;
        animation-duration: .3s;
    }

</style>