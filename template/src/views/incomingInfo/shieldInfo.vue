<template>
 <div class="common_Bg">
    <div class="common_title_box">
      <span>反欺诈结果</span>
    </div>
    <div class="common_table_box">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tdBasesListData">
        <el-table-column align="center" label="身份证号码" prop="idNo"></el-table-column>
        <el-table-column align="center" label="报告编号" prop="reportId"></el-table-column>
        <el-table-column align="center" label="检查日期" prop="queryDate"></el-table-column>
        <el-table-column align="center" label="调用结果" prop="success"></el-table-column>
        <el-table-column align="center" label="错误码" prop="reasonCode"></el-table-column>
        <el-table-column align="center" label="错误描述" prop="reasonDesc"></el-table-column>
        <el-table-column align="center" label="扫描时间" prop="applyTime"></el-table-column>
        <el-table-column align="center" label="报告时间" prop="reportTime"></el-table-column>
        <el-table-column align="center" label="风险系数" prop="finalScore"></el-table-column>
        <el-table-column align="center" label="风险评估结果" prop="finalDecision"></el-table-column>
        <el-table-column align="center" label="获取外部数据耗时" prop="timeConsume"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>反欺诈规则命中</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tdBasesRulesData">
        <el-table-column align="center" label="身份证号" prop="idNo"></el-table-column>
        <el-table-column align="center" label="报告编号" prop="reportId"></el-table-column>
        <el-table-column align="center" label="检查项编号" prop="itemId"></el-table-column>
        <el-table-column align="center" label="检查项名称" prop="itemName"></el-table-column>
        <el-table-column align="center" label="风险等级" prop="riskLevel"></el-table-column>
        <el-table-column align="center" label="检查项分组" prop="itemGroup"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>反欺诈规检查项详情</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tdBasesItemdtlData">
        <el-table-column align="center" label="报告编号" prop="reportId"></el-table-column>
        <el-table-column align="center" label="检查项编号" prop="itemId"></el-table-column>
        <el-table-column align="center" label="失信次数" prop="discreditTimes"></el-table-column>
        <el-table-column align="center" label="中介关键词" prop="hitListDatas"></el-table-column>
        <el-table-column align="center" label="高风险区域" prop="highRiskAreas"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>反欺诈逾期详情</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tdBasesOverdueData">
        <el-table-column align="center" label="报告编号" prop="reportId"></el-table-column>
        <el-table-column align="center" label="检查项编号" prop="itemId"></el-table-column>
        <el-table-column align="center" label="检查项详情序号" prop="seqId"></el-table-column>
        <el-table-column align="center" label="逾期金额" prop="overdueAmount"></el-table-column>
        <el-table-column align="center" label="逾期笔数" prop="overdueCount"></el-table-column>
        <el-table-column align="center" label="逾期天数" prop="overdueDay"></el-table-column>
      </el-table>
    </div>
    <div class="common_title_box_min">
      <span>反欺诈法院详情</span>
    </div>
    <div class="common_table_box_min">
      <el-table stripe fit highlight-current-row class="searchTable" border :data="tdBasesDetailData">
        <el-table-column align="center" label="风险类型" prop="fraudType"></el-table-column>
        <el-table-column align="center" label="被执行人姓名" prop="executedName"></el-table-column>
        <el-table-column align="center" label="年龄" prop="exectedAge"></el-table-column>
        <el-table-column align="center" label="性别" prop="executedGender"></el-table-column>
        <el-table-column align="center" label="省份" prop="executedProvince"></el-table-column>
        <el-table-column align="center" label="立案时间" prop="filingTime"></el-table-column>
        <el-table-column align="center" label="执法时间" prop="courtName"></el-table-column>
        <el-table-column align="center" label="做出执行依据" prop="executionDepartment"></el-table-column>
        <el-table-column align="center" label="生效法律文书" prop="duty"></el-table-column>
        <el-table-column align="center" label="被执行人的履行" prop="situation"></el-table-column>
        <el-table-column align="center" label="失信被执行人" prop="discreditDetail"></el-table-column>
        <el-table-column align="center" label="执行状态" prop=""></el-table-column>
        <el-table-column align="center" label="风险类型" prop="fraudType"></el-table-column>
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
      title: "同盾征信历史调查",
      coverShow: false,
      tdBasesListData: [],
      tdBasesRulesData: [],
      tdBasesItemdtlData: [],
      tdBasesOverdueData: [],
      tdBasesDetailData: []
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
      Api.queryTongDunInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.tdBasesListData = res.data.data.tdBasesList;
            this.tdBasesRulesData = res.data.data.tdBasesRules;
            this.tdBasesItemdtlData = res.data.data.tdBasesItemdtl;
            this.tdBasesOverdueData = res.data.data.tdBasesOverdue;
            this.tdBasesDetailData = res.data.data.tdBasesDetail;
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