import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index';
import Register from './views/register';
import NotFound from './views/404';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {path: '/', redirect: '/notFound'},
    {path: '/', name: 'indexLink', component: Index},
    {path: '/register', name: 'registerLink', component: Register},
    {path: '*', name: 'notFoundLink', component: NotFound},

    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
