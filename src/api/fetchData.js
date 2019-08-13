import fetch from '../config/fetch';

// 登录
export const login = (date) => fetch('http://localhost:3000/users, "GET", date')

// 获取 增加用户
export const add_user = (data) => fetch('http://localhost:3000/users',  "POST", data )


// 获取 所有的管理员
export const get_admin = () => fetch('http://localhost:3000/users?identity=管理员' )

// 获取所有老板
export const get_boss = () => fetch('http://localhost:3000/users?identity=老板' )

// 获取资金流水
export const get_fund_trend = () => fetch('http://localhost:3000/fund_trend')


// 获取存款
export const get_bank_savings = () => fetch('http://localhost:3000/bank_savings')


// 删除某条资金流水记录
export const delete_fund_trend = (id) => fetch('http://localhost:3000/fund_trend/' + id, "DELETE")


// 增加资金流水
export const add_fund_trend = (data) => fetch('http://localhost:3000/fund_trend',  "POST", data )
