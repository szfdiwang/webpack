<template>
  <div class='side-container'>
    <div class="navi-box">
      <div :class="{'slideBarOpen':!isCollapse,'slideBarClose':isCollapse}" >
        <img  @click="scroll()" src="@/assets/icon/icon_7.png" style="index:100">
      </div>
      <div class="naviBar">
        <!-- background-color="#245e95" -->
        <el-menu router @open="handleOpen" @close="handleClose" background-color="#245e95"  text-color="#fff"
          active-text-color="#e89029" :collapse="isCollapse" :default-active="$route.meta.num">
          <el-menu-item v-if="roleStatus.a" :class="{'openClass':!isCollapse,'closeClass':isCollapse}" index="/incomingInfo">
            <i :class="{'fa fa-bar-chart normalStatus':!isCollapse,'fa fa-bar-chart miniStatus':isCollapse}">
              <p v-if="isCollapse" class="title_font">进件信息查询</p>
            </i>
            <span v-if="!isCollapse" slot="title">进件信息查询</span>
          </el-menu-item>
          <el-menu-item v-if="roleStatus.b" :class="{'openClass':!isCollapse,'closeClass':isCollapse}" index="/querySchool">
            <i :class="{'fa fa-car normalStatus':!isCollapse,'fa fa-car miniStatus':isCollapse}">
              <p v-if="isCollapse" class="title_font">驾校查询</p>
            </i>
            <span v-if="!isCollapse" slot="title">驾校查询</span>
          </el-menu-item>
          <el-submenu v-if="roleStatus.c" :class="{'openSubClass':!isCollapse,'closeSubClass':isCollapse}" index="/mgtSystem">
            <template slot="title">
              <i :class="{'fa fa-wrench normalStatus':!isCollapse,'fa fa-wrench miniStatus':isCollapse}">
                <p v-if="isCollapse" class="title_font">系统管理</p>
              </i>
              <span v-if="!isCollapse">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/mgtSystem/partnerMgt">
                <i class="fa fa-users subicon"></i>
                <span>合作方管理</span>
              </el-menu-item>
              <el-menu-item index="/mgtSystem/userMgt">
                <i class="fa fa-user subicon"></i>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="/mgtSystem/userLogMgt">
                <i class="fa fa-sticky-note subicon"></i>
                <span>用户日志查询</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- <el-menu :default-active="$route.meta.num" router @select="menuSelect" @open="handleOpen()" @close="handleClose" active-text-color="#e89029" background-color="#245e95"
        :collapse="isCollapse" text-color="#fff">
        <el-menu-item :class="{'openClass':!isCollapse,'closeClass':isCollapse}" index="/home">
            <i :class="{'fa fa-bars normalStatus':!isCollapse,'fa fa-bars miniStatus':isCollapse}"><p v-if="isCollapse" class="title_font">首页</p></i>
            <span slot="title">首页</span>
          </el-menu-item>
        <template v-for="navi in oldNaviList">
          <el-submenu :class="{'openClass':!isCollapse,'closeClass':isCollapse}" v-if="navi.submenu" :index="navi.href" :key="navi.id">
            <template slot="title">
              <i :class="{'fa fa-bars normalStatus':!isCollapse,'fa fa-bars miniStatus':isCollapse}"><p v-if="isCollapse" class="title_font">{{navi.name}}</p></i>
              <span slot="title">{{navi.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item in navi.submenu" :index="item.href" :key="item.id">
                <i class="fa fa-circle-o subicon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :key="navi.id" :class="{'openClass':!isCollapse,'closeClass':isCollapse}" :index="navi.href" v-else>
            <i :class="{'fa fa-bars normalStatus':!isCollapse,'fa fa-bars miniStatus':isCollapse}"><p v-if="isCollapse" class="title_font">{{navi.name}}</p></i>
            <span slot="title">{{navi.name}}</span>
          </el-menu-item>
        </template>
      </el-menu> -->
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "./bus.js";
export default {
  name: "sideBar",
  data() {
    return {
      flex: true,
      active: true,
      oldNaviList: [],
      isCollapse: false
    };
  },
  computed: {
    roleStatus: function() {
      let roleStatus = {
        a: false,
        b: false,
        c: false
      };
      if (sessionStorage.roleId.indexOf("admin") > -1) {
        return (roleStatus = {
          a: true,
          b: true,
          c: true
        });
      } else if (sessionStorage.roleId.indexOf("JX001") > -1) {
        roleStatus.b = true;
        return roleStatus;
      } else if (sessionStorage.roleId.indexOf("DB001") > -1) {
        roleStatus.a = true;
        return roleStatus;
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    menuSelect(a, b) {
      console.log(a);
      console.log(b);
      Bus.$emit("msg", a);
    },
    init() {
      this.oldNaviList = this.navilist;
    },
    scroll() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse == false) {
      }
      // this.$emit("isOpen", this.isCollapse);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>