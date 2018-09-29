<template>
  <div class="bg_container">
    <div class="title_box">
      <span class="title_font">进件信息查询</span>
    </div>
    <div class="sreach_box">
      <span class="sreach_box_title">查询条件</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>
      <div class="sreach_box_inputline">
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">合同号</span>
          <el-input class="sreach_input" size="mini" v-model="contractNo" placeholder=""></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">姓名</span>
          <el-input class="sreach_input" size="mini" v-model="cusName" placeholder=""></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">身份证号</span>
          <el-input class="sreach_input" size="mini" v-model="idNo" placeholder=""></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">手机号</span>
          <el-input class="sreach_input" size="mini" v-model="phoneNo" placeholder=""></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">申请状态</span>
          <el-select class="sreach_input" size="mini" v-model="applyStatus" placeholder="">
            <el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">申请日期</span>
          <el-date-picker @change="onPickStart" class="sreach_input" size="mini" v-model="applyStartDate" placeholder="开始日期" value-format="yyyy-MM-dd"
            format="yyyy-MM-dd" type="date"></el-date-picker>-
          <el-date-picker @change="onPickEnd" class="sreach_input" size="mini" v-model="applyEndDate" placeholder="结束日期" value-format="yyyy-MM-dd"
            format="" type="date"></el-date-picker>
        </div>
        <!-- <div class="sreach_min_box">
          <span class="sreach_min_box_span">申请结束日期</span>
          <el-date-picker class="sreach_input"  size="mini" v-model="applyEndDate" placeholder="" value-format="yyyy-MM-dd" format="" type="date"></el-date-picker>
        </div> -->
      </div>
      <div class="btnLine">
        <el-button class="inputItemBtn" size="mini" icon="el-icon-search" type="primary" @click="searchFn">查询</el-button>
        <el-button class="inputItemBtn" size="mini" icon="el-icon-refresh" type="primary" @click="resetSearchBar">重置</el-button>
      </div>
    </div>
    <div class="table_box">
      <span class="table_box_title" style="margin-top:.1rem">查询结果</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>

      <div class="table_min_box">
        <div class="detailBtn">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="detailFn">查看详情</el-button>
        </div>
        <el-table stripe fit highlight-current-row class="searchTable" border :data="tableData">
          <el-table-column width="60px" align="center">
            <template slot-scope="scope">
              <el-radio v-model="radioVal" :label="scope.row.contractNo" name="radio" @change="handleEdit(scope.row)">{{""}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60px" label="序号" type="index" :index="typeIndex"></el-table-column>
          <el-table-column align="center" width="160px" label="合同号" prop="contractNo"></el-table-column>
          <el-table-column align="center" label="申请日期" prop="createTime"></el-table-column>
          <el-table-column align="center" label="产品名称" prop="applyProdName"></el-table-column>
          <el-table-column align="center" label="姓名" prop="name"></el-table-column>
          <el-table-column align="center" width="160px" label="身份证号" prop="idNo"></el-table-column>
          <el-table-column align="center" label="手机号" prop="cellPhone"></el-table-column>
          <el-table-column align="center" label="地区" prop="affCity"></el-table-column>
          <el-table-column align="center" label="贷款期数" prop="applyTerm"></el-table-column>
          <el-table-column align="center" label="申请额度" prop="applyLmt"></el-table-column>
          <el-table-column align="center" label="审批额度" prop="finalLmt"></el-table-column>
          <el-table-column align="center" label="审批期数" prop="finalTerm"></el-table-column>
          <el-table-column align="center" label="申请状态" prop="applyStatus">
            <template slot-scope="scope">
              <div v-for="item in statusList" :key="item.id">
                <div v-if="scope.row.applyStatus == item.name">{{item.label}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="tablePagenation" :total="totalNum" :current-page="currentPage" :page-sizes="[20,50,100]"
        :page-size="20" @current-change="pageChange" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <loading :shall-we-talk="coverShow"></loading>
  </div>
</template>
<script>
import Api from "@/Api/index";
import { diffDate } from "@/utils/utils";
export default {
  name: "incomingInfo",
  data() {
    sessionStorage.curTab = "contractInfo";
    return {
      contractNo: "",
      cusName: "",
      idNo: "",
      phoneNo: "",
      applyStartDate: "",
      applyEndDate: "",
      applyStatus: "",
      tableData: [],
      currentPage: 1,
      coverShow: false,
      pageSize: 20,
      totalNum: 0,
      statusList: [
        {
          id: 1,
          name: "R",
          label: "拒绝"
        },
        {
          id: 2,
          name: "D",
          label: "补录中"
        },
        {
          id: 3,
          name: "N",
          label: "分公司经理审查中"
        },
        {
          id: 4,
          name: "B",
          label: "审查中"
        },
        {
          id: 5,
          name: "F",
          label: "审批中"
        },
        {
          id: 6,
          name: "G",
          label: "待面签"
        },
        {
          id: 7,
          name: "H",
          label: "面签中"
        },
        {
          id: 8,
          name: "I",
          label: "待抵押"
        },
        {
          id: 9,
          name: "K",
          label: "抵押中"
        },
        {
          id: 10,
          name: "Q",
          label: "待抵押确认"
        },
        {
          id: 11,
          name: "X",
          label: "抵押确认中"
        },
        {
          id: 12,
          name: "DZ",
          label: "待质检"
        },
        {
          id: 13,
          name: "ZJ",
          label: "质检中"
        },
        {
          id: 14,
          name: "L",
          label: "还款中"
        },
        {
          id: 15,
          name: "W",
          label: "待放款"
        },
        {
          id: 16,
          name: "Z",
          label: "放款中"
        },
      ],
      tableSelect: {},
      radioVal: ""
    };
  },
  mounted() {
    this.initTable();
    this.initLog();
  },
  computed: {},
  methods: {
    onPickStart() {
      let boolean = diffDate(this.applyStartDate, this.applyEndDate, true);
      if (!boolean) {
        this.applyStartDate = "";
        this.applyEndDate = "";
      }
    },
    onPickEnd() {
      let boolean = diffDate(this.applyStartDate, this.applyEndDate);
      if (!boolean) {
        this.applyStartDate = "";
        this.applyEndDate = "";
      }
    },
    initLog() {
      let param = {};
      param.operType = "03";
      param.operId = sessionStorage.loginId;
      Api.addOperLog(param)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "插入日志记录失败!"
          });
        });
    },
    handleEdit(val) {
      console.log(val);
      this.tableSelect = val;
    },
    initTable() {
      this.coverShow = true;
      let params = {
        addCredit: "", // sessionStorage.partnerNo,
        contractNo: this.contractNo,
        name: this.cusName,
        idNo: this.idNo,
        cellPhone: this.phoneNo,
        applyBeginTime: this.applyStartDate,
        applyEndTime: this.applyEndDate,
        applyStatus: this.applyStatus,
        PageNo: this.currentPage,
        PageSize: this.pageSize,
        operId: sessionStorage.loginId
      };
      Api.queryApplyInfo(params)
        .then(res => {
          this.coverShow = false;
          console.log(res);
          if (res && res.data.resultCode == "1") {
            this.tableData = res.data.data;
            this.totalNum = res.data.number;
          }
          // else {
          //   this.coverShow = false;
          //   this.$message({
          //     type: "error",
          //     message: "查询失败"
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
    },
    searchFn() {
      this.currentPage = 1;
      this.initTable(1);
    },
    resetSearchBar() {
      this.contractNo = "";
      this.cusName = "";
      this.idNo = "";
      this.phoneNo = "";
      this.applyStartDate = "";
      this.applyEndDate = "";
      this.applyStatus = "";
    },
    typeIndex(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    pageChange(p) {
      this.currentPage = p;
      this.initTable(p);
    },
    detailFn() {
      if (Object.keys(this.tableSelect).length == 0) {
        this.$message({
          type: "warning",
          message: "请您先选择一条记录"
        });
      } else {
        sessionStorage.contractInfo = this.tableSelect["contractNo"];
        sessionStorage.idNo = this.tableSelect["idNo"];
        this.$router.push({
          name: "contractInfo",
          params: {
            data: this.tableSelect
          }
        });
      }
    },
    filterFn(data) {
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].name == data) {
          return this.statusList[i].label;
        }
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTable(1);
      console.log(`每页 ${val} 条`);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
