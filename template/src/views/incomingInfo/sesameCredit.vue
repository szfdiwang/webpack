<template>
  <div class="common_Bg">
    <div class="common_title_box">
      <span>芝麻信用查询</span>
    </div>
    <div class="common_table_box">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tableData">
        <el-table-column align="center" label="申请件编号">
          <template slot-scope="scope">
            <span>{{appNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份标识ID">
          <template slot-scope="scope">
            <span>{{idNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="授权错误编码" prop="errorCode"></el-table-column>
        <el-table-column align="center" label="芝麻信用分" prop="zmScore"></el-table-column>
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
      title: "审批历史信息",
      coverShow: false,
      appNo: "",
      idNo: ""
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo,
        idNo: sessionStorage.idNo
      };
      this.appNo = sessionStorage.contractInfo;
      this.idNo = sessionStorage.idNo;
      Api.queryZhiMaInfo(data)
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