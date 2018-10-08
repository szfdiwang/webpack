<template>
  <div class="bg_container">
    <div class="title_box">
      <span class="title_font">驾校查询</span>
    </div>
    <div class="sreach_box">
      <span class="sreach_box_title">查询条件</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>
      <div class="sreach_box_inputline">
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">姓名</span>
          <el-input class="sreach_input" size="mini" v-model="name" placeholder="请输入姓名"></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">证件号码</span>
          <el-input class="sreach_input" size="mini" v-model="idNo" placeholder="请输入证件号码"></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">提交状态</span>
          <el-select class="sreach_input" size="mini" v-model="status" placeholder="请选择提交状态" clearable>
            <el-option v-for="item in statuses" :key="item.codeNo" :label="item.codeName" :value="item.codeNo">
            </el-option>
          </el-select>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">合同编号</span>
          <el-input class="sreach_input" size="mini" v-model="appNo" placeholder="请输入合同编号"></el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">放款时间</span>
          <el-date-picker @change="onPickStart" value-format="yyyy-MM-dd" class="sreach_input" size="mini" v-model="beginDate"
            type="date" placeholder="开始日期">
          </el-date-picker>-
          <el-date-picker @change="onPickEnd" value-format="yyyy-MM-dd" class="sreach_input" size="mini" v-model="endDate"
            type="date" placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="btnLine">
        <el-button class="inputItemBtn" size="mini" icon="el-icon-search" type="primary" @click="searchFn">查询</el-button>
        <el-button class="inputItemBtn" size="mini" icon="el-icon-refresh" type="primary" @click="resetSearchBar">重置</el-button>
      </div>
    </div>
    <div class="table_box">
      <span class="table_box_title">查询结果</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>

      <div class="table_min_box">
        <el-table stripe border :data="tableData">
          <el-table-column align="center" width="60px" label="序号" type="index" :index="typeIndex"></el-table-column>
          <el-table-column align="center" label="放款时间" prop="loanTime"></el-table-column>
          <el-table-column align="center" label="合同编号" width="220px" prop="appNo"></el-table-column>
          <el-table-column align="center" label="客户姓名" prop="name"></el-table-column>
          <el-table-column align="center" label="证件号码" prop="idNo"></el-table-column>
          <el-table-column align="center" :formatter="formatAmount" label="分期金额" prop="amount"></el-table-column>
          <el-table-column align="center" label="分期期限" prop="term"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" label="渠道" prop="channelForShort"></el-table-column>
          <el-table-column align="center" label="提交状态" prop="status">
            <template slot-scope="scope">
              <div v-for="item in statuses" :key="item.codeNo">
                <div v-if="scope.row.status == item.codeNo">{{item.codeName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" label="居住地址" prop="jzLocationDetail"></el-table-column>
        </el-table>
      </div>
      <el-pagination class="tablePagenation" :total="totalNum" :current-page="currentPage" :page-size="pageSize"
        @size-change="sizeChange" @current-change="pageChange" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
    </div>
    <loading :shall-we-talk="coverShow"></loading>
  </div>
</template>
<script>
  import {
    diffDate
  } from "@/utils/utils";
  import Api from "@/Api/index";
  export default {
    name: "querySchool",
    mounted() {
    },
    created() {},
    data() {
      return {
        idNo: "",
        appNo: "",
        name: "",
        status: "",
        beginDate: "",
        endDate: "",
        statuses: [],
        tableChecked: "",
        coverShow: false,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        totalNum: 0
      };
    },
    methods: {
      onPickStart() {
        let boolean = diffDate(this.beginDate, this.endDate, true);
        if (!boolean) {
          this.beginDate = "";
          this.endDate = "";
        }
      },
      onPickEnd() {
        let boolean = diffDate(this.beginDate, this.endDate);
        if (!boolean) {
          this.beginDate = "";
          this.endDate = "";
        }
      },
      typeIndex(index) {
        return index + (this.currentPage - 1) * this.pageSize + 1;
      },
      pageChange(p) {
        this.currentPage = p;
        this.initTable();
      },
      sizeChange(size) {
        this.pageSize = size;
        this.initTable();
      },
      searchFn() {
        this.currentPage = 1;
        this.initTable();
      },
      resetSearchBar() {
        this.appNo = "";
        this.name = "";
        this.idNo = "";
        this.status = "";
        this.beginDate = "";
        this.endDate = "";
        this.currentPage = 1;
        this.initTable();
      },
      //查询码值
      initstatusSelect() {
        let param = {};
        param.codeType = "jpfq_status";
        Api.queryCodeLibrary(param)
          .then(res => {
            let result = res.data;
            if (result.resultCode == "1") {
              this.statuses = result.data.codeList;
            } else {
              this.$message({
                type: "error",
                message: res.data.errorDesc
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //查询参数
      initTable() {
        this.coverShow = true;
        let param = {};
        param.pageNo = this.currentPage;
        param.pageSize = this.pageSize;
        param.idNo = this.idNo;
        param.status = this.status;
        param.name = this.name;
        param.appNo = this.appNo;
        param.beginDate = this.beginDate;
        param.endDate = this.endDate;
        if (sessionStorage.roleId.indexOf("admin") > -1) {
          param.isErong = "1";
        } else {
          param.isErong = "0";
        }
        param.channelId = sessionStorage.partnerNo;
        param.operId = sessionStorage.loginId;
        Api.queryLoanInfo(param)
          .then(res => {
            let result = res.data;
            if (result.resultCode == "1") {
              this.tableData = result.data.loanList;
              this.totalNum = result.data.total;
              this.coverShow = false;
            } else {
              this.coverShow = false;
              this.$message({
                type: "error",
                message: res.data.errorDesc
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.coverShow = false;
            this.$message({
              type: "error",
              message: "数据初始化失败!"
            });
          });
      },
      initLog() {
        let param = {};
        param.operType = "04";
        param.operId = sessionStorage.loginId;
        Api.addOperLog(param)
          .then(res => {
            let result = res.data;
            if (result.resultCode == "1") {}
            //						else {
            //							this.$message({
            //								type: "error",
            //								message: "插入日志记录失败!"
            //							});
            //						}
          })
          .catch(err => {
            console.log(err);
            //						this.$message({
            //							type: "error",
            //							message: "插入日志记录失败!"
            //						});
          });
      },
      formatAmount: function (row, column) {
        return row.amount.toFixed(2);
      }
    }
  };

</script>
<style lang="scss" scoped>
  .btnLine {
    margin-top: 0.05rem;
  }

</style>
