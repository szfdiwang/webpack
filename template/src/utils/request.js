/**
 * @author wangchenchen@myerong.com
 * @description axios请求拦截器
 */
import vue from "vue"
import axios from "axios"
import store from "@/vuex/index.js"
import {
  Message,
  MessageBox
} from "element-ui"
import router from '@/router/index'

let yourProjectPath = ""; //类似"erong-cfss-pbes/"

axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

console.log(process.env);
axios.defaults.baseURL = process.env.BASEURL;
axios.interceptors.request.use(config => {
  if (config.url.indexOf("oauth/token") >= 0) {
    config.headers.Authorization = process.env.BASIC//各环境下网关的不同Basic
  } else {
    if (process.env && process.env.NODE_ENV != "development") {
      config.baseURL = config.baseURL + yourProjectPath; //此处根据不同项目切换
    }
    if (store.state.token) {
      config.headers.Authorization = `bearer ${store.state.token}`
    } else if (sessionStorage.token) {
      config.headers.Authorization = `bearer ${sessionStorage.token}`
      store.commit("gettoken", sessionStorage.token);
      store.commit("getuser", sessionStorage.user);
    }
  }
  return config;
}, err => {
  return Promise.reject(err)
});
const ruleArr = ['ZUUL-010102', 'ZUUL-010103', 'ZUUL-010104', 'ZUUL-010106', 'ZUUL-010109', 'ZUUL-010111'];
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode && response.data.resultCode != 1) {
      if (ruleArr.indexOf(response.data.errorCode) > -1) {
        //需要跳转的请求
        Message({
          type: "error",
          message: response.data.errorDesc + '即将跳转登陆页'
        });
        store.commit("logout");
        setTimeout(function () {
          //  控制路由跳转或者直接改变href到登录页
          router.push({
            path: "/"
          })
        }, 1000)
      }
      //  else {
      //   Message({
      //     type: "error",
      //     message: response.data.errorDesc
      //   })
      // }
    }
    return Promise.resolve(response)
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit("logout")

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: {
                redirect: router.currentRoute.path
              },
            })
      }
    }
    return Promise.reject(error)
  },
)
export default axios
