<template>

<div class="block">
    <el-date-picker
      size="small"
      type="daterange"
      v-model="date"
      value-format='timestamp'
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="small" @click="onFilter">筛选</el-button>
  </div>

</template>

<script>
export default {
    data(){
        return {
            date: '',
            date_filter_table_data: [],
        }
    },
    props: {
        all_table_data: {
            type: Array,
            default(){
                return []
            }
        }
    },

    methods: {

        onFilter(){
            if(this.date == null || this.date.length < 2){
                this.$emit("datePick", this.all_table_data)
                return 
            } 

            this.date_filter_table_data = this.all_table_data.filter( item => {
                return item.date >= this.date[0] && item.date <= this.date[1]
            })

            this.$emit("datePick", this.date_filter_table_data)

        },
    }
}
</script>

<style scoped>
.el-button{
    margin-left: 10px;
}
</style>