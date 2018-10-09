import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/index.js'
import {
  Message
} from 'element-ui'
Vue.use(Router)
//登录
const login = r => require.ensure([], () => r(require('@/components/login')), 'login');
//首页
const index = r => require.ensure([], () => r(require('@/views/index')), 'index');
const incomingInfo = r => require.ensure([], () => r(require('@/views/incomingInfo/incomingInfo')), 'incomingInfo');
const querySchool = r => require.ensure([], () => r(require('@/views/querySchool/querySchool')), 'querySchool')
const mgtSystem = r => require.ensure([], () => r(require('@/views/mgtSystem/mgtSystem')), 'mgtSystem')
const partnerMgt = r => require.ensure([], () => r(require('@/views/mgtSystem/partnerMgt')), 'partnerMgt')
const userLogMgt = r => require.ensure([], () => r(require('@/views/mgtSystem/userLogMgt')), 'userLogMgt')
const userMgt = r => require.ensure([], () => r(require('@/views/mgtSystem/userMgt')), 'userMgt')
const addCustomer = r => require.ensure([], () => r(require('@/views/mgtSystem/addCustomer')), 'addCustomer');
const editCustomer = r => require.ensure([], () => r(require('@/views/mgtSystem/editCustomer')), 'editCustomer');
const queryDetail = r => require.ensure([], () => r(require('@/views/incomingInfo/queryDetail')), 'queryDetail')
const contractInfo = r => require.ensure([], () => r(require('@/views/incomingInfo/contractInfo')), 'contractInfo')
const approvalHistory = r => require.ensure([], () => r(require('@/views/incomingInfo/approvalHistory')), 'approvalHistory')
const phoneCheckHistory = r => require.ensure([], () => r(require('@/views/incomingInfo/phoneCheckHistory')), 'phoneCheckHistory')
const shieldInfo = r => require.ensure([], () => r(require('@/views/incomingInfo/shieldInfo')), 'shieldInfo')
const sesameCredit = r => require.ensure([], () => r(require('@/views/incomingInfo/sesameCredit')), 'sesameCredit')
const fahaiRiskMgt = r => require.ensure([], () => r(require('@/views/incomingInfo/fahaiRiskMgt')), 'fahaiRiskMgt')
const insiderShild = r => require.ensure([], () => r(require('@/views/incomingInfo/insiderShild')), 'insiderShild')


//错误提示
const error404 = r => require.ensure([], () => r(require('@/components/error404')), 'error404');
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
    children: [{
        path: '/incomingInfo',
        name: "incomingInfo",
        component: incomingInfo,
        meta: {
          num: '/incomingInfo'
        },
      },
      {
        path: '/incomingInfo/queryDetail',
        name: "queryDetail",
        component: queryDetail,
        meta: {
          num: '/incomingInfo'
        },
        children: [{
          path: '/incomingInfo/queryDetail/contractInfo',
          name: "contractInfo",
          component: contractInfo,
          meta: {
            num: '/incomingInfo'
          },
        }]
      }, {
        path: '/querySchool',
        name: "querySchool",
        component: querySchool,
        meta: {
          num: '/querySchool'
        }
      }, {
        path: '/mgtSystem',
        name: "mgtSystem",
        component: mgtSystem,
        meta: {
          num: '/mgtSystem'
        },
        children: [{
            path: '/mgtSystem/partnerMgt',
            name: "partnerMgt",
            component: partnerMgt,
            meta: {
              num: '/mgtSystem/partnerMgt'
            }
          },
          {
            path: '/mgtSystem/userMgt',
            name: "userMgt",
            component: userMgt,
            meta: {
              num: '/mgtSystem/userMgt'
            }
          },
          {
            path: '/mgtSystem/userLogMgt',
            name: "userLogMgt",
            component: userLogMgt,
            meta: {
              num: '/mgtSystem/userLogMgt'
            }
          },
          {
            path: '/mgtSystem/addCustomer',
            name: "addCustomer",
            component: addCustomer,
            meta: {
              num: '/mgtSystem/addCustomer'
            }
          }, {
            path: '/mgtSystem/editCustomer',
            name: "editCustomer",
            component: editCustomer,
            meta: {
              num: '/mgtSystem/editCustomer'
            }
          },
        ]
      }
    ]
  }, {
    path: '/incomingInfo/queryDetail/phoneCheckHistory', //电话查询
    name: "phoneCheckHistory",
    component: phoneCheckHistory,
    meta: {
      num: '/incomingInfo'
    },
  }, {
    path: '/incomingInfo/queryDetail/sesameCredit', //芝麻
    name: "sesameCredit",
    component: sesameCredit,
    meta: {
      num: '/incomingInfo'
    },
  }, {
    path: '/incomingInfo/queryDetail/approvalHistory', //历史审批
    name: "approvalHistory",
    component: approvalHistory,
    meta: {
      num: '/incomingInfo'
    },
  }, {
    path: '/incomingInfo/queryDetail/shieldInfo', //同盾
    name: "shieldInfo",
    component: shieldInfo,
    meta: {
      num: '/incomingInfo'
    },
  }, {
    path: '/incomingInfo/queryDetail/fahaiRiskMgt', //法海
    name: "fahaiRiskMgt",
    component: fahaiRiskMgt,
    meta: {
      num: '/incomingInfo'
    },
  },
  {
    path: '/incomingInfo/queryDetail/insiderShild', //共借人同盾芝麻
    name: "insiderShild",
    component: insiderShild,
    meta: {
      num: '/incomingInfo'
    },
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
