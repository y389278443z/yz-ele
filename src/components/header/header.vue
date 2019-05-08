<template>
    <div class="yz-header baseBg" :class="{fixed: fixed}">
        <div class="lc-header">
            <span class="el-icon-arrow-left header-left-icon" @click="back"></span>
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'headerTop',
        props:{
            text: {},
            fixed: {
                default: false
            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            }
        }
    }
</script>

<style scoped lang="less">

</style>