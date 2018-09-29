<template>
  <div class="common_Bg">
    <div class="common_title_box">
      <span>{{title}}</span>
    </div>
    <div class="common_table_box">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tableData">
        <el-table-column align="center" label="流程环节节点" prop="nodeNmae"></el-table-column>
        <el-table-column align="center" label="审批状态" prop="rtfState"></el-table-column>
        <el-table-column align="center" label="操作人员ID" prop="operatorId"></el-table-column>
        <el-table-column align="center" label="操作人员姓名" prop="operatorName"></el-table-column>
        <el-table-column align="center" label="操作人员手机号" prop="operatorPhone"></el-table-column>
        <el-table-column align="center" label="审批额度" prop="approvalLmt"></el-table-column>
        <el-table-column align="center" label="前置手续费" prop="applyFeeRate"></el-table-column>
        <el-table-column align="center" label="信用贷" prop="wsLoanMoney"></el-table-column>
        <el-table-column align="center" label="宁波通商" prop="nbtsLoanMoney"></el-table-column>
        <el-table-column align="center" label="保证金" prop="applyBond"></el-table-column>
        <el-table-column align="center" label="审批期数" prop="approvalTerm"></el-table-column>
        <el-table-column align="center" label="审批开始时间" prop="claimTime"></el-table-column>
        <el-table-column align="center" label="审批结束时间" prop="completeTime"></el-table-column>
        <el-table-column align="center" label="备注" prop="remarks"></el-table-column>
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
      coverShow: false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo
      };
      Api.queryHisInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.tableData = res.data.data;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: "查询历史审批失败"
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