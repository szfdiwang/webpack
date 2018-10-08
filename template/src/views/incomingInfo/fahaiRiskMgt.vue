<template>
  <div class="common_Bg">
    <div class="common_title_box">
      <span>查询结果概览</span>
    </div>
    <div class="common_table_box">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="mainData">
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="身份证" prop="idNo"></el-table-column>
        <el-table-column align="center" label="查询日期" prop="createTime"></el-table-column>
        <el-table-column align="center" label="裁判文书条数" prop="cpwsList"></el-table-column>
        <el-table-column align="center" label="执行公告条数" prop="zxggList"></el-table-column>
        <el-table-column align="center" label="失信公告条数" prop="shixinList"></el-table-column>
        <el-table-column align="center" label="曝光台条数" prop="bgtList"></el-table-column>
        <el-table-column align="center" label="开庭公告条数" prop="ktggList"></el-table-column>
        <el-table-column align="center" label="法院公告条数" prop="fyggList"></el-table-column>
        <el-table-column align="center" label="案件流程条数" prop="ajlcList"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min" style="margin-top:.4rem">
      <span>裁判文书信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="cpwsListData">
        <el-table-column align="center" label="标题" prop="cpwsTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="cpwsMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="cpwsBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="cpwsSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>执行公告信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="zxggListData">
         <el-table-column align="center" label="标题" prop="zxggTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="zxggMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="zxggBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="zxggSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>失信公告信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="shixinListData">
        <el-table-column align="center" label="标题" prop="shixinTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="shixinMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="shixinBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="shixinSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>曝光台信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="bgtListData">
        <el-table-column align="center" label="标题" prop="bgtTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="bgtMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="bgtBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="bgtSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>开庭公告信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="ktggListData">
        <el-table-column align="center" label="标题" prop="ktggTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="ktggMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="ktggBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="ktggSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>法院公告信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="fyggListData">
        <el-table-column align="center" label="标题" prop="fyggTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="fyggMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="fyggBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="fyggSortTime"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>案件流程信息</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="ajlcListData">
         <el-table-column align="center" label="标题" prop="ajlcTitle"></el-table-column>
        <el-table-column align="center" label="匹配度" prop="ajlcMatchRatio"></el-table-column>
        <el-table-column align="center" label="内容概要" prop="ajlcBody"></el-table-column>
        <el-table-column align="center" label="审结时间" prop="ajlcSortTime"></el-table-column>
      </el-table>
    </div>
    <loading :shall-we-talk="coverShow"></loading>
  </div>
</template>
<script>
import Api from "@/Api/index";
export default {
  name: "approvalHistory",
  data() {
    return {
      mainData: [],
      cpwsListData: [],
      zxggListData: [],
      shixinListData: [],
      bgtListData: [],
      ktggListData: [],
      fyggListData: [],
      ajlcListData: [],

      title: "法海风控信息查询",
      coverShow: false
    };
  },
  mounted() {
  },
  methods: {
    initData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo,
        idNo: sessionStorage.idNo
      };
      Api.queryFhInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.mainData = res.data.data.fhList;
            this.cpwsListData = res.data.data.cpwsfh;
            this.zxggListData = res.data.data.zxggfh;
            this.shixinListData = res.data.data.shixinfh;
            this.bgtListData = res.data.data.bgtfh;
            this.ktggListData = res.data.data.ktggfh;
            this.fyggListData = res.data.data.fyggfh;
            this.ajlcListData = res.data.data.ajlcfh;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: "查询法海风控失败"
          //   });
          // }
        })
        .catch(err => {
          this.coverShow = false;
          this.$message({
            type: "error",
            message: "通讯故障,请联系客服人员"
          });
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.common_Bg {
  padding: 0.5rem;
}
.common_title_box_min {
  text-align: center;
  font-size: 0.2rem;
}
.common_title_box {
  text-align: center;
  font-size: 0.5rem;
}
</style>