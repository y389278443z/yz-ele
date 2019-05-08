<template>
    <transition name="fade">
        <div class="yz-message" v-show="messageShow">
            {{text}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'message',
        data() {
            return {
                text: '',
                messageShow: false,
                delay:1000
            }
        },
        created() {
            this.hideMessage();
        },
        methods: {
            hideMessage() {
                setTimeout(() => {
                    this.messageShow = false;
                }, this.delay)
            }
        }
    }
</script>

<style scoped lang="less">
    .yz-message{
        font-size:.28rem;
        color:#fff;
        white-space: nowrap;
        box-sizing: border-box;
        padding: .1rem .3rem;
        border-radius: .1rem;
        background:rgba(0,0,0,.8);
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        z-index: 100;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity linear .5s;
    }
</style>