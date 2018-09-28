/**
 * @author  wangchenchen@myerong.com
 * 请求范例
 */
import axios from "@/utils/request"
const Api = {
  userLogin(data) {
    return axios({
      method: "post",
      url: "/pbes/login/loginUserRole",
      data: data
    })
  },
  logout(data) {
    return axios({
      method: "post",
      url: "/cfss/dwss/user/logout",
      data: {
        loginName: data
      }
    })
  },
  loginByZuul(data) {
    return axios({
      method: "get",
      url: "/auth/oauth/token?" + `grant_type=password&username=${data.username}&password=${data.password}&sys=${data.sys}`,
      //    params:data
    })
  },
  //用户查询
  queryCustomer(data) {
    return axios({
      method: "post",
      url: "/pbes/user/queryUserInfo",
      data: data,
    })
  },
}

export default Api
