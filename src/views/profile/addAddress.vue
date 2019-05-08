<template>
    <div class="addAddress">
        <header-top :text="text" fixed="false"></header-top>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1.4rem" class="addForm marginT10">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="ruleForm.sex" size="small">
                    <el-radio label="1" border >男</el-radio>
                    <el-radio label="2" border>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="备用号" prop="saphone">
                <el-input v-model="ruleForm.saphone" placeholder="备用号"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" @click.native="searchAddress">
                <el-input v-model="ruleForm.address" placeholder="小区/写字楼/学校等" readonly  suffix-icon="el-icon-arrow-right"></el-input>
            </el-form-item>
            <el-form-item label="门牌" prop="house">
                <el-input type="textarea" v-model="ruleForm.house"></el-input>
            </el-form-item>
            <el-form-item prop="kind" class="kind-item" label="标签">
                <el-radio-group v-model="ruleForm.kind" size="small">
                    <el-radio label="家" border></el-radio>
                    <el-radio label="公司" border></el-radio>
                    <el-radio label="学校" border></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAddress('ruleForm')">添加</el-button>
            </el-form-item>
        </el-form>
        <router-view></router-view>
    </div>
</template>

<script>
    import headerTop from '@/components/header/header';
    import {mapState} from 'vuex';
    import {addAddress} from "../../api";
    import {getStorage} from "../../utils";

    const USER_INFO = 'user_info';
    const GEO_HASH = 'geo_hash';
    const SET_ADDRESS_CHOICE = 'SET_ADDRESS_CHOICE';

    export default {
        name: 'addAddress',
        components: {
            headerTop
        },
        data() {
            return {
                text: '添加地址',
                ruleForm:{
                    name: '',
                    sex: '',
                    address: '',
                    house: '',
                    kind: '',
                    phone: '',
                    saphone: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        {required: true, message: '请输入正确格式的手机号', trigger: 'blur'}
                    ],
                    saphone: [
                        { required: true, message: '请输入备用号码', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请选择正确的地址', trigger: 'input'}
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    house: [
                        {required: true,  message: '请输入详细的门牌等信息', trigger: 'blur'}
                    ],
                    kind: [
                        {required: true, message: '请选择地址标签', trigger: 'blur'}
                    ]
                },
                userId: '',
                geohash: '',
                tag_type: null
            }
        },
        methods: {
            addAddress(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let formname = this.ruleForm;
                        switch (formname.kind) {
                            case '家' :
                                this.tag_type =1;
                                break;
                            case '学校' :
                                this.tag_type =2;
                                break;
                            case '公司' :
                                this.tag_type = 3;
                                break;
                        }
                        addAddress(this.userId, formname.address, formname.house, this.geohash, formname.name, formname.phone, formname.saphone, formname.sex, this.tag_type).then(res => {
                            if (res.status === 1) {
                                this.$alert({
                                    message: '添加成功!',
                                    type: "success",
                                    success: () => {
                                        this.$store.commit(SET_ADDRESS_CHOICE);
                                        this.$router.back(-1);
                                    }
                                })
                            } else if(res.status === 0){
                                this.$alert({
                                    message: res.message,
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            searchAddress() {
                this.$router.push({name: 'searchAddress'});
            }
        },
        created() {
            let userInfo = JSON.parse(getStorage(USER_INFO));
            this.userId = userInfo.user_id;
            this.geohash = getStorage(GEO_HASH);
        },
        computed: {
            ...mapState([
                'choiceAddress'
            ])
        },
        watch: {
            'choiceAddress' (newV) {
                this.ruleForm.address = newV;
            }
        }
    }
</script>

<style scoped lang="less">
    .addForm{
        padding:.2rem .3rem;
    }
</style>
<style>
    .kind-item .el-radio{
        margin-right:.1rem;
    }
</style>