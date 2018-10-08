<template>
  <div class="common_Bg">
    <div class="common_title_box">
      <span>{{title}}</span>
    </div>
    <div class="common_table_box">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tableData">
        <el-table-column align="center" label="姓名" prop="telcheckName"></el-table-column>
        <el-table-column align="center" label="关系" prop="telcheckRelationship"></el-table-column>
        <el-table-column align="center" label="致电类型" prop="telType"></el-table-column>
        <el-table-column align="center" label="致电电话" prop="customerNumber"></el-table-column>
        <el-table-column align="center" label="致电日期" prop="startTime"></el-table-column>
        <el-table-column align="center" label="通话时长" prop="callLastTime"></el-table-column>
        <el-table-column align="center" label="操作员名称" prop="userName"></el-table-column>
        <el-table-column align="center" label="电话录音" prop="recordFile">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.recordFile">录音</a>
          </template>
        </el-table-column>
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
      tableData: [],
      title: "电话查询历史",
      coverShow: false
    };
  },
  mounted() {
  },
  methods: {
    initData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo
      };
      Api.queryCallHisInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.tableData = res.data.data;
          }
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