import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index';
import Register from './views/register';
import Login from './views/login';
import NotFound from './views/404';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: "home",
          component: () => import( './views/home'),
          meta: {title: "首页"}
        },
       
        {
          path: '/fund-admin',
          name: "fund-admin",
          component: () => import( './views/fund-admin'),
          meta: {title: "资金管理"},
          redirect: '/fund-admin/fund-trend',
          children: [
            {
              path: '/fund-admin/fund-trend',
              name: "fund-trend",
              component: () => import( './views/fund-trend'),
              meta: {title: "资金流水", }
            },
            
          ]

        },
        {
          path: '/info-admin',
          name: "info-admin",
          component: () => import( './views/info-admin'),
          meta: {title: "信息管理", },
          redirect: '/info-admin/user-info',
          children: [
            {
              path: '/info-admin/user-info',
              name: "user-info",
              component: () => import( './views/user-info'),
              meta: {title: "个人信息", }
            }
          ]
        },
        {
          path: '/qita',
          name: "qita",
          component: () => import( './views/qita'),
          meta: {title: "其他",  },
          redirect: '/qita/user-info',
          children: [
            {
              path: '/qita/add-users',
              name: "add-users",
              component: () => import( './views/add-users'),
              meta: {title: "增加用户",  }
            }
          ]
        }
      ]
    },
    {
      path: '/register', 
      component: Register
    },
    {
      path: '/login', 
      component: Login
    },
    {
      path: '*', 
      name: 'notFound', 
      component: NotFound
    },

  ]
})

// 全局守卫
// 未登录状态下只能访问 登录页、注册页
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else if(isLogin){
    next();
  }else{
    next("/login");
  }
})

export default router
