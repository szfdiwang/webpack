import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {
  Message
} from 'element-ui'
Vue.use(Router)
//登录
const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
//首页
const home = r => require.ensure([], () => r(require('@/components/homePage')), 'home');
const index = r => require.ensure([], () => r(require('@/views/index')), 'index');


//错误提示
const error404 = r => require.ensure([], () => r(require('@/components/error404')), 'error404');
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

const routes = [{
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: "index",
    component: index,
    meta: {
      num: "/index"
    },
    children: []
  },
  {
    path: '*',
    component: error404
  }
]

var router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.name == 'login') {
    next();
  } else {
    // 对路由进行验证     
    if (store.state.islogin && store.state.islogin == 1) {
      // 已经登陆
      next();
    } else if (sessionStorage.islogin && sessionStorage.islogin == 1) {
      store.commit('islogin', sessionStorage.islogin);
      //是否因为刷新导致vuex变量失效
      next();
    } else if (from.fullPath.indexOf("?user") > -1) {
      next();
    } else {
      Message({
        type: "error",
        message: '您还没有登录,已为您切换登录页'
      });
      setTimeout(router.push({
        path: '/login'
      }), 1000);
    }
  }
})

export default router;
