<template>

<el-container class="index">

    <el-aside :width="isCollapse" class="left-menu" >
       <div class="fixed">
            <LeftMenu></LeftMenu>
       </div>
    </el-aside>
 
    <el-main class="main">
        <router-view></router-view>
    </el-main>

</el-container>


    
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import LeftMenu from '../../components/left-menu';

export default {
    name: 'index',
    data(){
        return{}
    },
    components: {
        LeftMenu,
    },

    computed: {
        isCollapse(){
            if(this.$store.getters.isCollapse){
                return "65px"
            }else{
                return "160px"
            }
        }
    }
    
}
</script>

<style scoped>
.index{
    width: 100%;
}

.fixed{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
}

.el-aside.left-menu{
    height: 100vh;
    transition: width 0.3s ease-in-out;
}

.el-main.main{
    min-width: 900px;
    padding: 0;
    margin: 0;
}

</style>
