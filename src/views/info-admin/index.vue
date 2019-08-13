<template>
    <el-container class="info-admin">

        <el-header height='50px'>
            <HeaderNav></HeaderNav>
        </el-header>
    
        <el-main>
            <router-view></router-view>
        </el-main>

    </el-container>
</template>

<script>
import HeaderNav from '../../components/header-nav';

export default {
    name: "info-admin",
    components: {
        HeaderNav,
    }
}
</script>

<style scoped>
.el-header{
    border-bottom: 1px solid #ddd
}

.el-main{
    box-sizing: border-box;
    padding: 10px;
}


</style>
