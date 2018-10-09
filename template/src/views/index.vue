<template>
  <el-container style="height:100%">
    <el-header height=".6rem">
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <el-aside width="auto" min-width=".64rem">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-main style="height:100%">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <el-footer height=".7rem">
          
          <span class="foot_font">CopyRight © 2017 深圳汇海易融互联网金融服务有限公司</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import sideBar from "@/components/sideBar.vue";
import headerBar from "@/components/header.vue";
import Bus from "../components/bus";
export default {
  name: "index",

  data() {
    return {
      showDialog: false
    };
  },
  mounted() {
    Bus.$on("msg", () => {
      this.showDialog = true;
    });
  },
  methods: {
    close() {
      this.showDialog = false;
    }
  },
  components: {
    sideBar,
    headerBar,
  }
};
</script>
<style lang="scss" scoped>
</style>