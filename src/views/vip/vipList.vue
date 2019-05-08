<template>
    <div class="vip-list">
        <header-top :text="text"></header-top>
        <noting :text="text1" :tryMore="text2"></noting>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import noting from '@/components/noting/noting';

    export default {
        name: 'vipList',
        components: {
            headerTop,
            noting
        },
        data() {
            return {
                text: '购买记录',
                text1: '没有购买记录',
                text2: ''
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>