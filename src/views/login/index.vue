<template>
<div class="login">

    <transition name="login" appear>
        <section class="form-container">

            <span class="title">资金管理系统</span>
            
            <el-form :model="loginUser" status-icon :rules="rules" ref="loginFrom" label-width="60px" class="login-from">

                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="loginUser.email" placeholder='请输入邮箱'></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginUser.password" placeholder='请输入密码'></el-input>
                </el-form-item>
                
                <el-form-item label-width="0">
                    <el-button type="primary" class="submit_btn"  @click="submitForm('loginFrom')">登录</el-button>
                </el-form-item>

                <div class="to-register">
                    <p>还没账号？<router-link to="/register">立即注册</router-link></p>
                </div>

            </el-form>
            
        </section>
    </transition> 

</div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import {login} from '../../api/fetchData';


export default {
    name: 'login',
   data(){
        return{
            loginUser: {
                email: '',
                password: '',
            },
           
            rules: {
                email:[
                    {required: true,  message: '请输入邮箱', trigger: 'blur' },
                    {type: 'email', message: '邮箱错误', trigger: 'blur' }
                ],
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur' },
                    {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }

                ],
            },
        }
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.loginUser)
                        .then((res) => {
                            if(res.length == 0){
                                this.$message.error('账号或密码错误')
                                return
                            }
                            // 获取token
                            // const { token } = res.data;
                            const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2IzODE5MmY3ZjMwMWNkOGFmYjFjMyIsIm5hbWUiOiJ6aGkiLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2ZiZGNjMTYwODQ1MDVmMzU1YzE5NTQ3Y2NiNzkwOTk0P3M9MjAwJnI9cGcmZD1tbSIsImlkZW50aXR5Ijoi5ZGY5belIiwiaWF0IjoxNTY0MjM2NDkxLCJleHAiOjE1NjQyNDAwOTF9.bv5gftmcE6NTpvw6Enx7o2odKtmubRXnd9yDq_vnBKU"
                            // 存储token
                            window.localStorage.setItem("eleToken", token)

                            // 解析token
                            const decoded = jwt_decode(token);

                            // 解析后存错到store
                            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
                            this.$store.dispatch("setUser", decoded);
                            
                            this.$message({
                                message: '登录成功',
                                type: "success"
                            })

                            this.$router.push("/")

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
        },

        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        },
    },
}
</script>

<style scoped>
.login{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../assets/bg.jpg') no-repeat center center;
    background-size: 100% 100%;
}

.login-enter{
    opacity: 0;
    transform: translatey(-100px)
}

.login-enter-active{
    transition: all 0.5s ease-in-out;
}

.login-enter-to{
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

.login-from{
    padding: 20px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 5px 10px #cccc;
}

.to-register p{
    text-align: right;
    font-size: 12px;
}
</style>