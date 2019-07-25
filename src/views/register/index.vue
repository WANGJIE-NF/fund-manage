<template>
<div class="register">
    <section class="form-container">
        <!-- <div class="manage-tip">
            <span class="ti">资金管理系统</span>
            
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
                  <el-form-item label="选择身份" prop="password2">
                    <el-select v-model="registerUser.identity" placeholder='请输入密码'>
                        <el-option label='管理员' value='manage'></el-option>
                        <el-option label='员工' value='employee'></el-option>
                    </el-select>
                </el-form-item>

              
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerFrom')">提交</el-button>
                </el-form-item>
            </el-form>
        </div> -->

        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">111</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

    </section>

</div>
    
</template>

<script>
export default {
    name: 'register',
    data(){
        return{
            registerUser: {
                name: '',
                email: '',
                paddword: '',
                paddword2: '',
                identity: '',

            }
        }
    },
    components: {},
}
</script>

<style scoped>
.register{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../assets/bg.jpg') no-repeat center center;
    background-size: 100% 100%;
}

.form-container{
    position: absolute;
    top: 50px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    text-align: center;
}

.manage-tip span{
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



.el-row {
    margin-bottom: 20px;
  
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 30px 0;
    background-color: #f9fafc;
  }

</style>
