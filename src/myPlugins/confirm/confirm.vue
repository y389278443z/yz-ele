<template>
    <div class="yz-model" v-show="modelShow">
        <transition enter-active-class="heartBeat" leave-active-class="bounceOutDown">
            <div class="confirm-box" v-show="boxShow">
                <div class="confirm-top marginB6">
                    <span class="el-icon-error"></span>
                </div>
                <div class="confirm-body marginB6">
                    {{message}}
                </div>
                <div class="confirm-btn">
                    <el-button type="info" size="small" @click="handleBtn('cancel')">取消</el-button>
                    <el-button type="danger" size="small" @click="handleBtn('ok')">确认</el-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'confirm',
        data() {
            return {
                modelShow:false,
                boxShow: false,
                message : '',
                delay: 1000,
                promiseStatus: {
                    cancel: null,
                    sure: null
                }
            }
        },
        methods: {
            confirm() {
                return new Promise((resolve, reject) => {
                    this.promiseStatus.cancel = reject;
                    this.promiseStatus.sure = resolve;
                });
            },
            handleBtn(type) {
                this.boxShow = false;
                setTimeout(() => {
                    this.modelShow = false;
                    if (type === 'cancel') {
                        this.promiseStatus.cancel();
                    } else {
                        this.promiseStatus.sure();
                    }
                }, this.delay)
            }
        }
    }
</script>

<style scoped lang="less">
    .marginB6{margin-bottom:.6rem;}
    .yz-model{
        position:fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        z-index:10;
        background:rgba(0,0,0,0.2);
        font-size:.3rem;
    }
    .confirm-box{
        width:4.8rem;
        padding:.2rem;
        border-radius: .15rem;
        background:#fff;
        position:absolute;
        top:50%;
        left:50%;
        margin-top: -2rem;
        margin-left: -2.6rem;
        text-align: center;
    }
    .confirm-top{
        font-size:.66rem;
        margin:.3rem 0;
        color:#f56c6c;
    }

    @keyframes heartBeat {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        14% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }

        28% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        42% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }

        70% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    .heartBeat{
        animation-name: heartBeat;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
    }
    @keyframes bounceOutDown {
        20% {
            -webkit-transform: translate3d(0, 10px, 0);
            transform: translate3d(0, 10px, 0);
        }

        40%,
        45% {
            opacity: 1;
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(0, 2000px, 0);
            transform: translate3d(0, 2000px, 0);
        }
    }
    .bounceOutDown{
        animation-name: bounceOutDown;
        animation-duration: 1s;
    }
</style>