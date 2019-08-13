
<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb" appear >
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" >
        <router-link v-if="index!==levelList.length-1"  :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        <span  v-else class="no-redirect">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name && item.meta.title)

      matched.forEach((item,index) => {
        if(item !== this.levelList[index] ){
            this.levelList.splice(index, 1, item)
        }
      })
    }
  }
}
</script>

<style  scoped>
  .app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }

   .breadcrumb-enter-active{
    transition: all 0.8s ease-in-out;
  }


  /*** 开始插入、移除结束的位置变化 ***/
  .breadcrumb-enter, .breadcrumb-leave-to{
    opacity: 0.2;
    transform: translatex(-10px) ;
  }

 

  .app-breadcrumb.el-breadcrumb  .no-redirect{
      cursor: text;
    }
</style>

