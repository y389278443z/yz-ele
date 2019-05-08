<template>
    <div class="star-rating">
        <div class="under-star">
            <img src="images/icons/star1.png" alt="">
        </div>
        <div class="up-star" :style="{width:upWidth}">
            <img src="images/icons/star2.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'starRating',
        props: {
            ratingScore: {
                type: Number,
                required: true
            },
            isDirect: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            upWidth () {
                if (this.isDirect) {
                    return this.ratingScore + '%';
                }
                return this.ratingScore * 20 + '%'
            }
        }
    }
</script>

<style lang="less">
    .star-rating{
        position:relative;
        font-size:0;
        img{
            height:100%;
            width:auto;
        }
        .under-star{
            height:100%;
        }
        .up-star{
            overflow: hidden;
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
    }
</style>