<template>
    <div class="register">

        <transition name="register" appear>
            <section class="form-container">

                <span class="title">资金管理系统</span>
                
                <el-form :model="registerUser" status-icon :rules="rules" ref="registerFrom" label-width="80px" class="register-from">
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="registerUser.name" placeholder='请输入用户名'></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="registerUser.email" placeholder='请输入邮箱'></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder='请输入密码'></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder='请输入密码'></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份" prop="identity">
                        <el-select v-model="registerUser.identity" placeholder='请选择身份'>
                            <el-option label='管理员' value='manage'></el-option>
                            <el-option label='老板' value='employee'></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label-width="0">
                        <el-button type="primary" class="submit_btn"  @click="submitForm('registerFrom')">提交</el-button>
                    </el-form-item>

                        <div class="to-login">
                        <p>已有账号，<router-link to="/login">立即登录</router-link></p>
                    </div>

                </el-form>

            </section>
        </transition>
        
    </div>
    
</template>

<script>

import {add_user,} from '../../api/fetchData';


export default {
    name: 'register',
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            registerUser: {
                name: "",
                email: "",
                password: "",
                password2: "",
                identity: "管理员",

                id: '',
                user_id: '',
                reg_date: '',
                avatar: '',
                completed: '',
                province : '',
                city: ''
            },
             
            rules: {
                name:[
                    {required: true, message: '请输入用户名', trigger: 'blur' },
                    {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
                ],
                email:[
                    {required: true,  message: '请输入邮箱', trigger: 'blur' },
                    {type: 'email', message: '邮箱错误', trigger: 'blur' }

                ],
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur' },
                    {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }

                ],
                password2:[
                    {validator: validatePass2, trigger: 'blur'}
                ],
            },
        }
    },

    

    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.registerUser.reg_date = new Date().getTime()
                add_user(this.registerUser)
                    .then((res) => {
                        this.$message({
                            message: '注册成功',
                            type: "success"
                        })
                        this.$router.push('/login')
                    })
                    .catch((err => {
                        console.log(err)
                    }));
            }
        });
      },
    },

    components: {},
}
</script>

<style scoped>
.register{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../assets/bg.jpg') no-repeat center center;
    background-size: 100% 100%;
}

.register-enter{
    opacity: 0;
    transform: translatey(-100px)
}

.register-enter-active{
    transition: all 0.5s ease-in-out;
}

.register-enter-to{
    transform: translatey(0) ;
    
}

.form-container{
    position: absolute;
    top: 50px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    text-align: center;
}

.title{
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

.register-from{
    padding: 20px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 5px 10px #cccc;
}

.to-login p{
    text-align: right;
    font-size: 12px;
}



</style>
