<template>
<div class="add-data">

    <div class="add-users">
        <p class="tip">增加&nbsp;管理员、老板</p>
        <el-form ref="form" :model="user" label-width="80px">
            <template v-for="(val, pro) in user">
                <el-form-item   :label="pro" :key="pro">
                    <el-input :value="val" size="mini" :disabled="true" ></el-input>
                </el-form-item>
            </template>   
            
            <el-form-item label='提交次数' >
                <el-input-number v-model="num"  :min="1" :max="200" :step="10" size="mini"></el-input-number>
            </el-form-item>

            <el-form-item label-width="0">
                   <el-button type="primary" style="width: 100%;" @click="onAddUser">提交</el-button>
            </el-form-item>

           
        </el-form >
    </div> 

</div>
    
</template>

<script>
import {add_user, get_admin} from '../../api/fetchData';

export default {
    name: 'login',
    data(){
        return{
            num: 1,
            user: {
                id: '',
                user_id: '',
                name: '',
                password: '',
                identity: '',
                reg_date: '',
                email: '',
                avatar: '',
                completed: '',
                province : '',
                city: ''
            },

            users: {
                xing: '王李张刘杨陈赵黄周吴徐郑马朱胡郭何高林罗孙梁谢宋唐许韩邓曹彭曾萧田董潘袁于蒋蔡余杜叶程苏魏吕丁任沈',
                ming: '缥缈轩辕浮光缠绵碧影星愿星月星雨沧澜醉月春媱夏露秋颜冬耀缱绻涟漪若溪微凉暖阳半夏崖悔洛尘矜柔绚烂矫情真淳明媚迷离隐忍灼热幻灭落拓锦瑟妖娆邪殇离殇恋夏',
                identity: ["管理员", '老板'],
                reg_date: "",
                email: ["@qq.com", " @gmail.com",],
                avatar: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565025115&di=e3c8dc1ac928ee4e88df7d8a44819df2&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.besoo.com%2Ffile%2F201808%2F31%2Fhohnoeduumx.jpg',
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1564420340&di=eb2e63f073cc7df511638a9359df2672&src=http://img.besoo.com/file/201811/12/zqymzgdqn0s.jpg',
                    'https://image.baidu.com/search/detail?z=0&ipn=d&word=%E5%8D%A1%E9%80%9A%E7%AE%80%E7%BA%A6%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=4&spn=0&di=0&pi=&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&cs=3305851175%2C137473745&os=1650212330%2C78721048&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=0&simics=2545742344%2C2523947757&oriquery=&objurl=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db10000_10000%26sec%3D1564420340%26di%3De596b44e2f8c2d6f75a12353c4385020%26src%3Dhttp%3A%2F%2Fwww.agri35.com%2FUploadFiles%2Fimg_0_3305851175_137473745_26.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bw26tnc_z%26e3Bv54AzdH3FrtvAzdH3F%25El%25AB%25lb%25Em%25Bb%25bc%25Ec%25bD%25A8%25El%25ba%25lA%25Em%25bn%25bc%25E9%25BE%25An%25Ec%25A9%25B9%25Ec%25bn%25bF%25Eb%25la%25bC%25Ec%25l8%25bm%25E9%25Bb%25ba%25Ec%25AF%25BlAzdH3F&gsm=0&islist=&querylist=&cardserver=1',
                    'https://image.baidu.com/search/detail?z=0&ipn=d&word=%E5%8D%A1%E9%80%9A%E7%AE%80%E7%BA%A6%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=7&spn=0&di=0&pi=&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&cs=3524399346%2C264670249&os=2358931511%2C2025173724&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=0&simics=2545742344%2C2523947757&oriquery=&objurl=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db10000_10000%26sec%3D1564420340%26di%3D1344b7f18b4f9789bc7a488f37cb102e%26src%3Dhttp%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F1c950a7b02087bf4fe5c462ef9d3572c10dfcf41.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fzit1w5_z%26e3Bkwt17_z%26e3Bv54AzdH3Fq7jfpt5gAzdH3F80abnbb09m9ammlmbma_z%26e3Bip4s&gsm=0&islist=&querylist=&cardserver=1',
                    'https://image.baidu.com/search/detail?z=0&ipn=d&word=%E5%8D%A1%E9%80%9A%E7%AE%80%E7%BA%A6%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=14&spn=0&di=0&pi=&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&cs=3414822558%2C3949118094&os=664562465%2C3331109653&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=0&simics=2545742344%2C2523947757&oriquery=&objurl=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db10000_10000%26sec%3D1564420340%26di%3Daa4c4be08ba3d7d9bd156f7f2a6aed9e%26src%3Dhttp%3A%2F%2Fimg.besoo.com%2Ffile%2F201810%2F19%2F00varyqjak5.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bkjf55_z%26e3Bv54AzdH3Fqq2jxtg2AzdH3Ffi5o-n8l9n_z%26e3Bip4s&gsm=0&islist=&querylist=&cardserver=1',
                    'https://image.baidu.com/search/detail?z=0&ipn=d&word=%E5%8D%A1%E9%80%9A%E7%AE%80%E7%BA%A6%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=18&spn=0&di=0&pi=&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&cs=3156239913%2C2013398964&os=2605626798%2C2358821947&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=0&simics=2545742344%2C2523947757&oriquery=&objurl=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db10000_10000%26sec%3D1564420340%26di%3Dc9b619ffa3987a3fb1313e71510c7609%26src%3Dhttp%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2019-02-26%2F004641209.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bqqzit_z%26e3Bv54AzdH3Fp57xtwg2AzdH3Fmml00lAzdH3F&gsm=0&islist=&querylist=&cardserver=1',
                    'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%8D%A1%E9%80%9A%E7%AE%80%E7%BA%A6%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=15&spn=0&di=17160&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2598172381%2C2501031691&os=246479745%2C4250129273&simid=3997713593%2C495486483&adpicid=0&lpn=0&ln=1097&fr=&fmq=1564420454910_R&fm=result&ic=0&s=undefined&hd=0&latest=0&copyright=0&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F16%2F20160816101718_W5edG.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3Dmca8bmd0a&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
                ],
                area: [
                    {
                        name: "华东地区",
                        important: 3,
                        provinces: [
                            {
                                name: '上海',
                                 important: 2,
                                citys: [ {important: 10, name: '上海市'}]
                            },
                            {
                                name: '江苏省',
                                important: 4,
                                citys: [{important: 4, name: '南京'}, {important: 2, name: '苏州'}, {important: 2, name: '无锡'}, {important: 2, name: '常州'}]
                            },
                             {
                                name: '浙江省',
                                important: 4,
                                citys: [{important: 4, name: '杭州市'}, {important: 2, name: '宁波市'},{important: 2, name: '嘉兴'},{important: 2, name: '金华'}]
                            },
                        ]
                    },
                    {
                        name: "华南地区",
                        important: 3,
                        provinces: [
                            {
                                name: '广东省',
                                important: 6,
                                citys: [{important: 5, name: '广州市'}, {important: 4, name: '深圳市'},{important: 1, name: '佛山'}]
                            },
                             {
                                name: '海南省',
                                important: 2,
                                citys: [{important: 5, name: '海口'}, {important: 5, name: '三亚'}]
                            },
                            {
                                name: '香港',
                                important: 1,
                                citys: [ {important: 10, name: '香港'}]
                            },
                            {
                                name: '澳门',
                                important: 1,
                                citys: [ {important: 10, name: '澳门'}]
                            },
                        ]
                    },
                    {
                        name: "华北地区",
                        important: 2,
                        provinces: [
                            {
                                name: '北京',
                                important: 4,
                                citys: [{important: 10, name: '北京市'}]
                            },
                            {
                                name: '天津',
                                important: 2,
                                citys: [{important: 10, name: '天津市'}]
                            },
                             {
                                name: '河北省',
                                important: 4,
                                citys: [{important: 6, name: '石家庄'},{important: 2, name: '邢台'},{important: 2, name: '秦皇岛'}]
                            },
                        ]
                    },
                    {
                        name: "其它地区",
                        important: 2,
                        provinces: [
                            {
                                name: '其他城市',
                                important: 10,
                                citys: [{important: 3, name: '重庆市'},{important: 3, name: '成都市'},{important: 2, name: '西安市'},{important: 2, name: '哈尔滨'}]
                            },
                        ]
                    },
                ]
            },
        }
    },

    methods: {
        userMing(){
            const len = this.users.ming.length - 2;
            let number = 0;
            while(number <= 0 || number > len){
                number = Math.ceil(Math.random() * 100)
            }
            return  number % 2 == 0 ? this.users.ming.slice(number, (number + 1)) : this.users.ming.slice(number, (number + 2));
        },

        userProp(prop, times){
            const len = this.users[prop].length -1;
            let number = 0;
            while(number <= 0 || number > len){
                number = Math.ceil(Math.random() * times)
            }
            return this.users[prop][number];
        },

        comImp(prop, index, c_index){

            let list = [];
            let sum = 0;

            // 根据prop将权重添加到数组中，并计算总和
            switch(prop){
                case 'completed': 
                    this.users.area.forEach((item) => {
                        list.push( item.important );
                        sum += item.important;
                    })
                    break;
               case 'provinces': 
                    this.users.area[index].provinces.forEach((item) => {
                        list.push( item.important );
                        sum += item.important;
                    })
                    break;
               case 'citys': 
                    this.users.area[index].provinces[c_index].citys.forEach((item) => {
                        list.push( item.important );
                        sum += item.important;
                    })
                    break;

            }

            // 计算权重的区间
            let arr = [];
            let first = 0 ;
            let after = 0;

            list.forEach( val => {
                after = first + val / sum * 100;
                arr.push([ first, after ] );
                first = after;
            }, 0)

            return arr
        },

        userCompleted(){

            let completed_region_list = []
            let province_region_list = []
            let city_region_list = []

            completed_region_list = this.comImp('completed')
            const number = Math.ceil(Math.random() * 100)

            completed_region_list.forEach((item, index) => {

                if( number > item[0] && number <= item[1]){
                    this.user.completed = this.users.area[index].name;

                    province_region_list = this.comImp('provinces', index)
                    const number = Math.ceil(Math.random() * 100)

                    province_region_list.forEach((c_item, c_index) => {
                        if( number > c_item[0] && number <= c_item[1]){
                            this.user.province = this.users.area[index].provinces[c_index].name;

                            city_region_list = this.comImp('citys', index, c_index)
                            const number = Math.ceil(Math.random() * 100)

                            city_region_list.forEach((cc_item, cc_index) => {
                                if( number > cc_item[0] && number <= cc_item[1]){
                                    this.user.city = this.users.area[index].provinces[c_index].citys[cc_index].name;
                                }

                            })
                        }
                    })
                }
            })
        },

        upData(){
            this.user.user_id = new Date().getTime();
            this.user.name = this.userProp('xing', 100) + this.userMing();
            this.user.password = Math.ceil(Math.random() * 100000000);
            this.user.identity = Math.random() < 0.95 ? "管理员" : "老板";
            this.user.reg_date = new Date().getTime();
            this.user.email = Math.ceil(Math.random() * 100000000000) + '@qq.com' ;
            this.user.avatar = this.userProp('avatar', 10)
            this.userCompleted();
        },

        onAddUser(){
            for(let i = 0; i < this.num; i++){
                setTimeout(() => {
                    add_user(this.user)
                        .then( res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    this.upData();

                }, i * 400)
            }
           
        },

    },
    created(){
        this.$nextTick(() => {
            this.upData();

        })
       
    }
}
</script>

<style scoped>

.add-users{
    display: inline-block;
    width: 300px;
    padding: 5px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px 2px rgb(43, 44, 59)
}
.tip{
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}
.el-form-item{
    margin-bottom: 0px;
}

</style>