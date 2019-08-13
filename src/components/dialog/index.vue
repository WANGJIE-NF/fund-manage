<template>
    <el-dialog :title="dialog.title" :visible='dialog.isShow'  :show-close=false >
        <el-form :model="dialog_form_data" ref="dialog" :rules="rules">
            <el-form-item label="收支类型" label-width="100px" prop="type">
                <el-select v-model="dialog_form_data.type" >
                    <el-option label="收入" value="收入"></el-option>
                    <el-option label="支出" value="支出"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" label-width="100px" prop="amount">
                <el-input v-model.number="dialog_form_data.amount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="标签" label-width="100px" prop="label">
                <el-input v-model="dialog_form_data.label" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="详情" label-width="100px" prop="describe">
                <el-input v-model="dialog_form_data.describe" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {add_fund_trend} from '../../api/fetchData';
export default {
    data(){
        return {
            rules: {
                type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
                amount: [ { required: true, message: '请输入金额', trigger: 'blur' } ],
                label: [ { required: true, message: '请添加标签', trigger: 'blur' }],
                describe: [ { required: true, message: '请添加描述', trigger: 'blur' }]
            }
        }
    },

    props: {
        dialog: Object,
        dialog_form_data: Object,
    },

    methods:  {
        submitForm(){
            this.$refs.dialog.validate((valid) => {
                if (!valid) return ;

                const option = this.dialog.option;
                const message = option == 'add' ? '添加成功' : '编辑成功'

                if(option == 'add'){
                    this.dialog_form_data.date = new Date().getTime()
                }
                
                add_fund_trend(this.dialog_form_data)
                    .then(res => {
                        this.$message({
                            message: message,
                            type: "success"
                        })
                        this.dialog.isShow = false;
                    })
                    .then(err => {
                        console.log(err)
                    })
            })

        },
        onCancel(){
            this.dialog.isShow = false;
        }
    },


}
</script>

<style scoped>

</style>
