<template>
  <div id="header-box">
    <div class="left-text">
      <img class="title_img" src="@/assets/icon/logo_50_7.png">
    </div>
    <div class="user-control">
      <el-tooltip content="密码设置" placement="bottom" effect="light">
        <i class="fa fa-cog homeIcon" @click="homeFn()"></i>
      </el-tooltip>
      <span class="el-dropdown-link avatar">
        <!-- <img class="userImg" src="../assets/icon/icon_6.png"> -->
      </span>
      <span class="userName">{{user}}</span>
      <!-- <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="userImg" src="../assets/newLogin/icon_19.png">
          <span class="userName">{{user}}</span>
          <i class="fa fa-chevron-down arrow"></i>
        </span>
        <el-dropdown-menu class="downmenu" placement="bottom" slot="dropdown">
          <el-dropdown-item command="logout">设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <el-tooltip content="安全退出" placement="bottom" effect="light">
        <span class="logoutBtn" @click="logoutFn()">
          <i class="fa fa-sign-out homeIcon"></i>
        </span>
      </el-tooltip>
    </div>

  </div>
</template>
<script>
  import {
    mapMutations
  } from "vuex";
  import dialogPwd from "@/components/dialogPwd.vue";
  import Bus from "@/components/bus.js";
  import store from "@/vuex/index.js";
  import Api from "@/Api/index.js";
  export default {
    name: "headerBar",
    //   props:['realList'],
    data() {
      return {
        value2: "",
        routeList: [],
        active: true,
        showDialog: false
      };
    },
    // components: { dialogPwd },
    computed: {
      user: function () {
        if (this.$store.state.userName && this.$store.state.userName != null) {
          return this.$store.state.userName;
        } else if (sessionStorage.userName) {
          //sessionStorage
          this.saveuser(sessionStorage.userName);
          return sessionStorage.userName;
        } else {
          return "未登陆";
        }
      }
    },
    methods: {
      ...mapMutations(["logout", "saveuser"]),
      homeFn() {
        //触发窗口淡出
        Bus.$emit("msg", "changePwd");
        // this.showDialog = true;
      },
      handleCommand(command) {},
      logoutFn() {
        this.logout();
        this.$router.push({
          path: "/login"
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .homeIcon {
    cursor: pointer;
  }
</style>