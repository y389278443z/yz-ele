<template>
    <div class="address height100" v-loading="addressLoading">
        <header-top :text="text"></header-top>
        <div class="address-content">
            <ul class="address-list">
                <li v-for="(item, index) in addressList" :key="index">
                    <div class="top c999 f15">
                        <span class="uName c222">{{item.name}}</span>
                        <span>{{item.sex == 1 ? '先生' : '女士'}}</span>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="alignItem">
                        <div class="flexAlign">
                            <span class="icon-site" :class="tagClass(item.tag_type)">{{tagName(item.tag_type)}}</span>
                            <p class="grow1 breakAll">
                                {{item.address}}
                                ({{item.address_detail}})
                            </p>
                        </div>
                        <div class="operate c999">
                            <span class="el-icon-close" @click.stop="deleteAddress(item.id, index)"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="address-footer" @click="addAddress">
            <span class="el-icon-circle-plus-outline"></span>
            <span>新增收货地址</span>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {getAddress, deleteAddress} from "../../api";
    import {getStorage} from "../../utils";

    const USER_INFO = 'user_info';

    export default {
        name: 'addressList',
        components: {
            headerTop
        },
        data() {
            return {
                text: '我的地址',
                addressList: [],
                userId: null,
                addressLoading: false
            }
        },
        methods: {
            deleteAddress(id, index) {
                this.$confirm({
                    message: '确定要删除吗？'
                    }).then(() => {
                        return deleteAddress(this.userId, id);
                    }).then((res) => {
                        if (res.status === 1) {
                            this.$msg({
                                text: '删除成功！'
                            });
                            this.addressList.splice(index, 1);

                        } else {
                            this.$alert({
                                message: res.message,
                                type: 'error'
                            })
                        }
                    }).catch(() => {});
            },
            addAddress() {
                this.$router.push({name: 'addAddress'});
            },
            getAddressList() {
                this.addressLoading = true;
                getAddress(this.userId).then(res => {
                    this.addressList = res;
                    this.addressLoading = false;
                })
            },
            tagClass(tag) {
                if (tag == '1') return 'jia';
                if (tag == '2') return 'company';
                if (tag == '3') return 'school'
            },
            tagName(tag) {
                if (tag == 1) return '家';
                if (tag == 2) return '公司'
                if (tag == 3) return '学校'
            }
        },
        created() {
            let userInfo = JSON.parse(getStorage(USER_INFO));
            this.userId = userInfo.user_id;
            this.getAddressList();
        },
        computed: {
            addressChange() {
                return this.$store.getters.isAddressChange;
            }
        },
        watch: {
            addressChange() {
                this.getAddressList();
            }
        }
    }
</script>

<style scoped lang="less">
    .breakAll { word-break: break-all;}
    .address-footer{
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        height:1rem;
        background:#fff;
        text-align: center;
        box-shadow: -1px 0 0 2px #eee;
        line-height:1rem;
        color:#666;
    }
    .address-list{
        margin-bottom:1rem;
        &>li{
            background:#fff;
            border-bottom:1px solid #f5f5f5;
            padding:.2rem;
        }
        .phone{
            margin-left:.2rem;
        }
    }
    .icon-site{
        font-size:.24rem;
        white-space: nowrap;
        margin-right:.1rem;
        line-height:.24rem;
        border:1px solid currentColor;
        border-radius: .05rem;
        &.jia{
            color:#409EFF;
        }
        &.company{
            color:#13ce66;
        }
        &.school{
            color:#F56C6C;
        }
    }
    .top{
        margin-bottom:.1rem;
    }
    .operate{
        white-space: nowrap;
        font-size:.4rem;
        span{
            margin: 0 .1rem;
        }
    }
    .addAddress{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
    }

</style>