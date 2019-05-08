<template>
    <div class="yz-model" v-show="modelShow">
        <transition enter-active-class="bounce" leave-active-class="hinge">
            <div class="alert-box" v-show="boxShow">
                <div class="alert-top marginB6">
                    <span :class="iconName" :style="{color:topColor}"></span>
                </div>
                <div class="alert-body marginB6">
                    {{message}}
                </div>
                <div class="alert-btn">
                    <el-button :type="btnColor" size="small" @click="closeModel">确认</el-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'alert',
        data() {
            return {
                modelShow:false,
                boxShow: false,
                type: '',
                iconName: '',
                btnColor: '',
                topColor: '',
                message : '',
                delay: 1000,
                success: null
            }
        },
        methods: {
            closeModel() {
                this.boxShow = false;
                setTimeout(() => {
                    this.modelShow = false;
                    if (this.success) {
                        this.success();
                    }
                }, this.delay)
            }
         },
        watch: {
            type () {
                switch (this.type) {
                    case 'warning':
                        this.iconName = 'el-icon-warning';
                        this.btnColor = 'warning';
                        this.topColor = '#E6A23C';
                        break;
                    case 'success':
                        this.iconName = 'el-icon-success';
                        this.btnColor = 'success';
                        this.topColor = '#67C23A';
                        break;
                    case 'error':
                        this.iconName = 'el-icon-error';
                        this.btnColor = 'danger';
                        this.topColor = '#F56C6C';
                        break;
                    default:
                        this.iconName = 'el-icon-info';
                        this.btnColor = 'primary';
                        this.topColor = '#409EFF';
                }
            }
        }
    }
</script>

<style scoped>
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
    .alert-box{
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
    .alert-top{
        font-size:.66rem;
        margin:.3rem 0;
    }

    @keyframes hinge {
        0% {
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }

        20%, 60% {
            transform: rotate3d(0, 0, 1, 80deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }

        40%, 80% {
            transform: rotate3d(0, 0, 1, 60deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
            opacity: 1;
        }

        to {
            transform: translate3d(0, 700px, 0);
            opacity: 0;
        }
    }
    @keyframes bounce {
        from,
        20%,
        53%,
        80%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        40%,
        43% {
            -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            -webkit-transform: translate3d(0, -30px, 0);
            transform: translate3d(0, -30px, 0);
        }

        70% {
            -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            -webkit-transform: translate3d(0, -15px, 0);
            transform: translate3d(0, -15px, 0);
        }

        90% {
            -webkit-transform: translate3d(0, -4px, 0);
            transform: translate3d(0, -4px, 0);
        }
    }

    .hinge{
        animation-name: hinge;
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    .bounce {
        animation-name: bounce;
        animation-duration: 1s;
        transform-origin: center bottom;
        animation-fill-mode: both;
    }
</style>