<template>

    <el-menu 
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409eff"
    :collapse="isCollapse"
    router
    :default-active="activeLink">

        <template v-for="item in items" >

            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title" >
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <template v-for="citem in item.children">
                    <el-menu-item  :index="citem.path" :key="citem.path">
                        <span slot="title">{{citem.name}}</span>
                    </el-menu-item>
                </template>
            </el-submenu>

            <el-menu-item v-else :index="item.path" :key="item.path">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
            </el-menu-item>

        </template>

    </el-menu>
</template>

<script>

export default {
    name: 'left-menu',

    data() {
      return {
        items: [
            {
                icon: "el-icon-s-home",
                name: "首页",
                path: "/home",
            },
            {
                icon: "el-icon-money",
                name: "资金管理",
                path: "/fund-admin",
                children: [
                    { path: "/fund-admin/fund-trend", name: "资金流水" },
                    
                ]
            },
            {
                icon: "el-icon-info",
                name: "信息管理",
                path: "/info-admin",
                children: [
                    { path: "/info-admin/user-info", name: "个人信息" }
                ]
            },
            {
                icon: "el-icon-info",
                name: "其他",
                path: "/qita",
                children: [
                    { path: "/qita/add-users", name: "增加用户" }
                ]
            }
        ]
      };
    },

    components: {
    },
    
    methods: {
       
    },

    computed: {
        activeLink(){
            return this.$route.path;
        },
        isCollapse(){
            return this.$store.getters.isCollapse
           
        }
    },

}
</script>

<style scoped>

.el-menu-vertical-demo{
    width: 100%;
    left: 0;
    height: 100vh;
    z-index: 10;
}

.el-submenu .el-menu-item{
    min-width: 160px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
  } 
</style>
