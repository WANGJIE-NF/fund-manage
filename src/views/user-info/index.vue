<template>
    <el-row type="flex"  justify="center" class="user-info">

        <el-col :span="5" class="user-info-left box-show">
            
            <img class="icon-user" src="https://cdn.duitang.com/uploads/item/201608/25/20160825214118_nMzNT.thumb.700_0.jpeg" alt="">
            <p class="user-name">wangjie</p>
            
            <p class="user-identity">
                <i class="el-icon-bangzhu"></i>
                <span>管理员</span>
            </p>
            <p class="user-phone">
                <i class="el-icon-phone"></i>
                <span>138....5234</span>
            </p>
            <p class='user-emali'>
                <i class="el-icon-message"></i>
                <span>2578576255@qq.com</span>
            </p>
        </el-col>

        <el-col :span="16" class="user-info-right box-show">
            
                
           
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'user-info',
    
}
</script>

<style scoped>

.user-info{
}

.box-show{
    height: 450px;
    border-radius: 10px;
    box-shadow: 0 0 5px #888;
}

.user-info-left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}

.icon-user{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.user-name{
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
}

.user-emali,
.user-phone,
.user-identity{
    padding-top: 5px;
    text-align: cneter;
}

.user-emali>i,
.user-phone>i,
.user-identity>i{
    padding-right: 5px;
}
.user-info-right{
   
}
</style>
