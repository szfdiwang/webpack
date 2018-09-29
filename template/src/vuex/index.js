import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    userName: "",
    loginId: "",
    partnerNo: "",
    token: "",
    navilist: [],
    islogin: 0,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.setItem("token", data);
      state.token = data;
    },
    [types.SETNAVILIST]: (state, data) => {
      sessionStorage.setItem("navilist", JSON.stringify(data));
      state.navilist = data;
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('contractInfo');
      sessionStorage.removeItem('curTab');
      sessionStorage.removeItem('idNo');
      sessionStorage.removeItem('loginId');
      sessionStorage.removeItem('partnerNo');
      sessionStorage.removeItem('roleId');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('token');
      sessionStorage.setItem('islogin', 0);
      state.token = "";
      state.islogin = 0;
      state.loginId = "";
      state.partnerNo = "";
      state.user = "";
      state.navilist = [];
      state.userName = "";
    },
    [types.SAVEUSER]: (state, data) => {
      sessionStorage.user = JSON.stringify(data); //.setItem("user", data);
      state.user = data;
    },
    [types.GETUSER]: (state, data) => {
      state.user = JSON.parse(sessionStorage.getItem("user"));
    },
    [types.GETTOKKEN]: (state, data) => {
      state.token = sessionStorage.getItem("token");
    },
    [types.GETUSRLIST]: (state, data) => {
      state.navilist = JSON.parse(data);
    },
    [types.ISLOGIN]: (state, data) => {
      state.islogin = data;
      sessionStorage.islogin = data;
    },
    [types.SAVEUSERNAME]: (state, data) => {
      state.userName = data;
      sessionStorage.userName = data;
    },
    [types.SAVEPARTNERNO]: (state, data) => {
      state.partnerNo = data;
      sessionStorage.partnerNo = data;
    },
    [types.GETUSERNAME]: (state, data) => {
      state.userName = sessionStorage.userName;
    },
    [types.GETPARTNERNO]: (state, data) => {
      state.partnerNo = sessionStorage.partnerNo;
    },
    [types.SAVELOGINID]: (state, data) => {
      state.loginId = data;
      sessionStorage.loginId = data;
    },
    [types.GETLOGINID]: (state, data) => {
      state.loginId = sessionStorage.loginId;
    }
  }
})
