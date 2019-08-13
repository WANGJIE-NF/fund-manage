<template>
    <div class="pagination">
        <el-row>
            <el-col :span="24">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.index"
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pagination: {
                page_index: 1,  // 显示第几页
                page_size: 5,   // 一页显示多少条
                page_sizes: [5, 10, 20],  // 每页显示多少条
                total: 0, // 一共有多少条
                layout: 'total, sizes, prev, pager, next, jumper' // 分页的属性
            },
            table_data: []
        }
    },
    props: {
        date_filter_table_data: {
            type: Array,
            default: [],
        },
       
    },

    methods: {
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagination.page_size = val;
            this.table_data = this.date_filter_table_data.filter((item, index) => {
                return index < val;
            })
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            let min = this.pagination.page_size * (val -1);
            let max = min + this.pagination.page_size;
            this.table_data = this.date_filter_table_data.filter((item, index) => {
                if(this.date_filter_table_data[index]){
                    return index >= min && index < max;
                }
            })
        },

        setPagination(){
            this.pagination.total = this.date_filter_table_data.length;
            this.pagination.page_index = 1;
            this.pagination.page_size = 5;
            this.table_data = this.date_filter_table_data.filter((item, index) => {
                return index < this.pagination.page_size;
            })
        },
    },

    watch: {
        
        date_filter_table_data:  function(val, oldVal){
            this.setPagination()
            this.$emit("pagination", this.table_data)
        },

        table_data: function(val, oldVal){
            this.$emit("pagination", this.table_data)
        },

    }

}
</script>

<style>

</style>
