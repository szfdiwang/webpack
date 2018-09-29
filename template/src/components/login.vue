<template>
  <body id="indexBg">
    <loading :shall-we-talk="coverShow"></loading>
    <div class="logo_title">
      <img src="../assets/icon/logo_7.png">
    </div>
    <div class="logo_content">
      <div class="login_img">
        <!-- <img src="" alt=""> -->
        <img src="../assets/icon/icon_42.png">
      </div>
      <div class="login_box">
        <img class="inner_logo_img" src="../assets/icon/icon_34.png">
        <el-input placeholder="请输入用户名" class="inner_input" v-model="loginData.loginName">
          <template slot="prepend">
            <img class="inner_input_img" src="../assets/icon/icon_25X25_1.png">
          </template>
        </el-input>
        <el-input placeholder="请输入密码" class="inner_input" type="password" v-model="loginData.password"
          @keyup.enter.native="submitLoginForm()">
          <template slot="prepend">
            <img class="inner_input_img" src="../assets/icon/icon_25X25_2.png">
          </template>
        </el-input>
        <div class="submit_input">
          <div @click="submitLoginForm()">登 录</div>
        </div>
        <transition name="errormessage"> 
          <div v-show="msgShowFlag" class="error_message_box">
            <span>
              <img src="../assets/icon/icon_4.png">{{errorMsg}}</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="foot_info">
      <!-- <p>e融所 | 轻松借贷 投资无忧 </p> -->
      <p>CopyRight ©2017 深圳汇海易融互联网金融服务有限公司</p>
    </div>
     <loading :shall-we-talk="coverShow"></loading>
  </body>
</template>

<script>
import { mapMutations } from "vuex";
import md5 from "js-md5";
import Api from "@/Api/index";
export default {
  name: "login",
  data() {
    return {
      user: {},
      userName: "",
      rules: {},
      navilist: [],
      loginData: {},
      coverShow: false,
      errorMsg: "",
      msgShowFlag: false,
      partnerNo: ""
    };
  },
  methods: {
    // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ...mapMutations([
      "login",
      "islogin",
      "saveUserName",
      "savePartnerNo",
      "saveLoginId"
    ]),

    submitLoginForm() {
      this.coverShow = true;
      this.msgShowFlag = false;
      let param = {};
      param.grant_type = "password";
      param.username = this.loginData.loginName;
      param.password = this.loginData.password;
      if (param.password) {
        param.password = md5(this.loginData.password);
      } else {
        param.password = "";
      }
      param.sys = "pbes";
      if (process.env.NODE_ENV == "development") {
        this.getUserInfo();
      } else {
        Api.loginByZuul(param)
          .then(res => {
            if (typeof res.data.access_token != "undefined") {
              this.coverShow = false;
              this.login(res.data.access_token);
              this.getUserInfo();
            } else {
              this.coverShow = false;
              this.msgShowFlag = true;
              this.errorMsg = "您的用户名密码错误 !";
              this.timeOut();
            }
          })
          .catch(e => {
            console.log(e);
            // this.$message({
            //   type: "error",
            //   message: "您的用户名或密码错误!"
            // });
            this.coverShow = false;
            this.msgShowFlag = true;
            this.errorMsg = "通讯异常,请联系管理员 !";
            this.timeOut();
          });
      }
    },
    getUserInfo() {
      this.coverShow = true;
      let data = {};
      data.operId = data.loginId = this.loginData.loginName;
      Api.userLogin(data)
        .then(res => {
          this.coverShow = false;
          if (
            res.data.resultCode == "1" &&
            Object.keys(res.data.data).length != 0
          ) {
            this.$message({
              type: "success",
              message: "登陆成功!"
            });
            // this.navilist = res.data.menusJson;
            var d = res.data.data;
            this.userName = d.longinName;
            this.partnerNo = d.partnerNo;
            //导航
            // this.$store.commit("islogin", 1);
            // this.$store.commit("saveUserName", this.userName);
            // this.$store.commit("savePartnerNo", this.partnerNo);
            // this.$store.commit("saveLoginId", d.loginId);
            this.islogin(1);
            this.saveUserName(this.userName);
            this.savePartnerNo(this.partnerNo);
            this.saveLoginId(d.loginId);

            let a = "";
            for (let obj in d.roleList) {
              a += d.roleList[obj].roleId + "/";
            }
            sessionStorage.setItem("roleId", a);
            if (sessionStorage.roleId.indexOf("admin") > -1) {
              this.$router.push({
                name: "incomingInfo"
              });
            } else if (
              sessionStorage.roleId.indexOf("JX001") > -1 &&
              sessionStorage.roleId.indexOf("DB001") > -1
            ) {
              this.$router.push({
                name: "incomingInfo"
              });
            } else if (
              sessionStorage.roleId.indexOf("JX001") > -1 &&
              sessionStorage.roleId.indexOf("DB001") < 0
            ) {
              this.$router.push({
                name: "querySchool"
              });
            } else if (
              sessionStorage.roleId.indexOf("DB001") > -1 &&
              sessionStorage.roleId.indexOf("JX001") < 0
            ) {
              this.$router.push({
                name: "incomingInfo"
              });
            }
          } else {
            this.msgShowFlag = true;
            this.errorMsg = "您的用户名密码错误 !";
            this.timeOut();
          }
        })
        .catch(e => {
          this.coverShow = false;
          this.msgShowFlag = true;
          this.errorMsg = "通讯异常,请联系管理员 !";
          this.timeOut();
        });
    },
    timeOut() {
      setTimeout(() => {
        this.msgShowFlag = false;
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>