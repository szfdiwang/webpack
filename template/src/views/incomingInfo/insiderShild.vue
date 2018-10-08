<template>
  <div class="common_Bg">
    <div v-if="showTongdun">
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
    </div>
    <div v-if="showZhima">
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
    </div>
    <div v-if="showFahai">
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
		  </div>
    
    <loading :shall-we-talk="coverShow"></loading>
  </div>
</template>
<script>
import Api from "@/Api/index";
export default {
  name: "insiderShild",
  data() {
    return {
      title: "同盾征信历史调查",
      tableData: [],
      coverShow: false,
      tdBasesListData: [],
      tdBasesRulesData: [],
      tdBasesItemdtlData: [],
      tdBasesOverdueData: [],
      tdBasesDetailData: [],
      mainData: [],
      cpwsListData: [],
      zxggListData: [],
      shixinListData: [],
      bgtListData: [],
      ktggListData: [],
      fyggListData: [],
      ajlcListData: [],
      showTongdun: false,
      showZhima: false,
      showFahai: false,
      appNo: "",
      idNo: ""
    };
  },
  mounted() {
  },
  computed: {},
  methods: {
    showMyMoney() {
      if (sessionStorage.insiderPage && sessionStorage.insiderPage == "ZHIMA") {
        this.showZhima = true;
      } else if (sessionStorage.insiderPage && sessionStorage.insiderPage == "TONGDUN") {
        this.showTongdun = true;
      } else if (sessionStorage.insiderPage && sessionStorage.insiderPage == "FAHAI") {
        this.showFahai = true;
      }
    },
    initShildData() {
      this.coverShow = true;

      let data = {
        contractNo: sessionStorage.contractInfo,
        idNo: sessionStorage.borrowManId
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
    },
    initZhiMaData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo,
        idNo: sessionStorage.borrowManId
      };
      this.appNo = sessionStorage.contractInfo;
      this.idNo = sessionStorage.borrowManId;
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
    },
    initFahaiData() {
      this.coverShow = true;
      let data = {
        contractNo: sessionStorage.contractInfo,
        idNo: sessionStorage.borrowManId
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
