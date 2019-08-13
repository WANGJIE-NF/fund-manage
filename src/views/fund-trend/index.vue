<template>
    <div class="fund-trend">

        <p>账户余额：{{bank_savings}}</p>

        <div>
            <el-row>
                <el-col :span="22">

                </el-col>
                <el-col :span="2">
                    <el-button type="primary" icon="view" size="small" @click="onhandleAdd()" > 添加 </el-button>
                    <Dialog :dialog="dialog" :dialog_form_data="dialog_form_data"></Dialog>
                </el-col>
            </el-row>
        </div>

        <div class="table" >
            <el-table :data="table_data" class="border" :default-sort = "{prop: 'date', order: 'descending'}" >

                <el-table-column type="index"></el-table-column>

                <el-table-column 
                prop="date" 
                label="日期" 
                width="150" 
                sortable>
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left:5px;">{{formatter(scope.row.date)}}</span>
                    </template>
                </el-table-column>

                <el-table-column 
                    prop="type" 
                    label="收支类型" 
                    width="130" 
                    sortable 
                    :filters="[{text:'收入',value:'收入'},{text:'支出',value:'支出'}]" 
                    :filter-method="onFilterType">
                </el-table-column>

                <el-table-column prop="amount" label="金额" width="100" sortable ></el-table-column>

                <el-table-column prop="describe" label="详情" width="150"></el-table-column>

                <el-table-column prop="labels"  label="标签"  width="140" :filters="filterLabelArr" :filter-method="onFilterLabel">>
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.label }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div class="pagination">
            <Pagination :all_table_data="all_table_data" @pagination="pagination"></Pagination>
        </div>
    </div>
</template>

<script>
import {get_fund_trend, get_bank_savings, delete_fund_trend} from '../../api/fetchData';
import Dialog from '../../components/dialog';
import Pagination from '../../components/pagination';

export default {
    name: "fund-trend",
    data(){
        return {
            table_data:[],  // 表格列表
            bank_savings: '',   // 账户余额
            dialog: {},     // 对话框属性
            dialog_form_data: {}, // 对话框表单数据
            all_table_data: []  // 从后台获取到的所有资金流水列表
        }
    },
    components: {
        Dialog,
        Pagination,
    },
    methods: {
        handleEdit(index, row) {
            this.dialog = {
                title: "修改资金流水",
                isShow: true,
                option: 'edit',
            }
            this.dialog_form_data = {
                type: row.type,
                amount: row.amount,
                describe: row.describe,
                label: row.label,
                date: row.date,
            }
        },

        onhandleAdd(){
            this.dialog_form_data = {}
            this.dialog = {
                title: "增加资金流水",
                isShow: true,
                option: 'add',
            }
        },

        handleDelete(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    delete_fund_trend(row.id)
                    .then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.updata();     //不知道什么原因，获取的数据仍然是删除前端数据       
                        this.$store.commit("set_operation_error", row);
                    })
                    .catch(err => console.log(err))
                }).catch(err => console.log(err))

        },

        formatter(tate){
            return this.formatData(tate)
        },

        onFilterType(value, row) {
            return row.type === value;
        },
        onFilterLabel(value, row) {
            return row.label === value;
        },

        updata(){
            get_fund_trend()
                .then( res => this.all_table_data = res )
                .catch( err => console.log(err) )

            get_bank_savings()
                .then( res => this.bank_savings = res.bank_savings )
                .catch( err => console.log(err) )
        },

        pagination(val){
            this.table_data = val
        },


        formatData(time){
            if(time > 0){
                var date = new Date();  
                date.setTime(time * 1);  
                var y = date.getFullYear();      
                var m = date.getMonth() + 1;      
                m = m < 10 ? ('0' + m) : m;      
                var d = date.getDate();      
                d = d < 10 ? ('0' + d) : d;      
                // var h = date.getHours();    
                // h = h < 10 ? ('0' + h) : h;    
                // var minute = date.getMinutes();    
                // var second = date.getSeconds();    
                // minute = minute < 10 ? ('0' + minute) : minute;      
                // second = second < 10 ? ('0' + second) : second;     
                // return `${y}-${m}-${d} ${h}:${minute}:${second}`;       
                return `${y}-${m}-${d}`;       
            }else{
                return "";
            }
        },
    },

    computed: {

        filterLabelArr() {
            var arr1 = [];
            let arr2 = []
            this.table_data.forEach((item,index)=>{
                if( arr1.indexOf(item.label) === -1 ){
                    arr1.push(item.label);
                    arr2.push({ text: item.label, value: item.label});
                }
            })
            return arr2;
        },

    },

    created(){
        this.$nextTick(() => {
            this.updata();
        })
    }
}
</script>

<style scoped>
.fund-trend{
    max-width: 1000px;
    margin: 0 auto;
}

.border{
    border-radius: 5px;
    border: 1px solid #ccc;
}

.tooltip{
    margin: 0 3px;
}

.pagination{
    text-align: right;
}
</style>
