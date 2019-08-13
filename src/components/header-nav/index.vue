<template>
    <el-row class="header-nav">

        <el-col :span="12" class="control">

            <div class="collapse">
                <el-button icon="el-icon-s-fold" v-show="!isCollapse" @click="onCollapseMenu()"></el-button>
                <el-button icon="el-icon-s-unfold" v-show="isCollapse" @click="onCollapseMenu()"></el-button>
            </div>

            <div class="breadcrumb">
                <Breadcrumb></Breadcrumb>
            </div>

        </el-col>

        <el-col :span="12" class="user-info">

            <img :src="user.avatar" class="icon-user">
            <div class="wrap-welcome">
                <p class="welcome">欢迎</p>
                <p class="name">{{user.name}}</p>
            </div>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="" command='info'>个人信息</el-dropdown-item>
                    <el-dropdown-item icon="" command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
        
</template>

<script>
import Breadcrumb from '../breadcrumb';

export default {
    name: 'header-nav',
    data(){
        return{}
    },
    components: {
        Breadcrumb,

    },

    methods: {

        onCollapseMenu(){
            this.$store.commit("set_isCollapse");
        },

        handleCommand(command){
            if(!command){
                this.$message(选项缺少command属性);
                return;
            }
            if(command == 'info'){
                this.$router.push({name: "userInfoLink"});
            }else if(command == 'logout'){
                localStorage.removeItem("eleToken");
                this.$store.dispatch("removeCurrentState");
                this.$router.push('/login');
            }
        }
    },

    computed: {
        user(){
            return this.$store.getters.user;
        },
        isCollapse(){
             return this.$store.getters.isCollapse;
        }
    },

    
    
}
</script>

<style scoped>
.header-nav{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
}

.control{
    display: flex;
    align-items: center;
}

.collapse>button{
    padding: 8px 10px;
    border: none;
    font-size: 25px;
}
.el-button.el-button{
    margin:0;
}

.icon-logo{
    width: 20px;
    vertical-align: -3px;
}

.logo-title{
    margin-left: 5px;
    font-size: 20px;
    font-weight: 600;
}

.user-info{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.icon-user{
    width: 25px;
    border-radius: 50%;
}

.el-icon-s-custom{
    font-size: 20px;
}

.wrap-welcome{
    padding: 0 10px;
    font-size: 12px;
    text-align: center;

}

</style>
