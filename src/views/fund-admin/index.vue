<template>
    <el-container class="fund-admin">

        <el-header>
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
    name: "fund-admin",
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
    padding: 10px;
}

</style>
