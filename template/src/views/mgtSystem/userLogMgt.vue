<template>
  <div class="bg_container">
    <div class="title_box">
      <span class="title_font">用户日志查询</span>
    </div>
    <div class="sreach_box">
      <span class="sreach_box_title">查询条件</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>
      <div class="sreach_box_inputline">
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">登录名</span>
          <el-input class="sreach_input" size="mini" v-model="loginId" placeholder="请输入登录名">
          </el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">姓名</span>
          <el-input class="sreach_input" size="mini" v-model="userNames" placeholder="请输入姓名">
          </el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">操作类型</span>
          <el-select class="sreach_input" size="mini" v-model="operType" placeholder="请选择操作类型" clearable>
            <el-option v-for="item in operTypes" :key="item.codeNo" :label="item.codeName" :value="item.codeNo">
            </el-option>
          </el-select>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">操作时间</span>
          <el-date-picker @change="onPickStart" value-format="yyyy-MM-dd" class="sreach_input" size="mini" v-model="beginDate" type="date"
            placeholder="开始日期">
          </el-date-picker>-
          <el-date-picker @change="onPickEnd" value-format="yyyy-MM-dd" class="sreach_input" size="mini" v-model="endDate" type="date"
            placeholder="结束日期">
          </el-date-picker>
        </div>
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
        <el-table stripe border :data="tableData">
          <el-table-column align="center" width="60px" label="序号" type="index" :index="typeIndex"></el-table-column>
          <el-table-column align="center" label="操作类型" prop="operType">
            <template slot-scope="scope">
              <div v-for="item in operTypes" :key="item.codeNo">
                <div v-if="scope.row.operType == item.codeNo">{{item.codeName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作时间" prop="operDate"></el-table-column>
          <el-table-column align="center" label="登录名" prop="loginId"></el-table-column>
          <el-table-column align="center" label="姓名" prop="userName"></el-table-column>
          <el-table-column align="center" label="手机号" prop="telPhone"></el-table-column>
          <el-table-column align="center" label="归属合作方" prop="partnerName"></el-table-column>
          <el-table-column align="center" label="合作方类型" prop="pbType">
            <template slot-scope="scope">
              <div v-for="item in pbTypes" :key="item.codeNo">
                <div v-if="scope.row.pbType == item.codeNo">{{item.codeName}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="tablePagenation" :total="totalNum" :current-page="currentPage" :page-size="pageSize"
        @size-change="sizeChange" @current-change="pageChange" layout="total,sizes,prev,pager,next,jumper"></el-pagination>

    </div>

    <loading :shall-we-talk="coverShow"></loading>
  </div>
</template>
<script>
import { diffDate } from "@/utils/utils";
import Api from "@/Api/index";
export default {
  name: "userLogMgt",
  mounted() {
  },
  created() {},
  data() {
    return {
      loginId: "",
      userNames: "",
      operType: "",
      beginDate: "",
      endDate: "",
      operTypes: [],
      pbTypes: [],
      tableChecked: "",
      coverShow: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      showClose: false,
      showTable: false,
      switchStatus: "全部收起",
      switchFlag: false
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
      this.loginId = "";
      this.userNames = "";
      this.operType = "";
      this.beginDate = "";
      this.endDate = "";
      this.currentPage = 1;
      this.initTable();
    },
    //查询码值
    initstatusSelect() {
      let param = {};
      param.codeType = "operType";
      Api.queryCodeLibrary(param)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
            this.operTypes = result.data.codeList;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: res.data.errorDesc
          //   });
          // }
        })
        .catch(err => {
          console.log(err);
        });
      let parameter = {};
      parameter.codeType = "pbType";
      Api.queryCodeLibrary(parameter)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
            this.pbTypes = result.data.codeList;
          }
          //  else {
          //   this.$message({
          //     type: "error",
          //     message: res.data.errorDesc
          //   });
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询参数
    initTable() {
      this.coverShow = true;
      let param = {};
      param.page = this.currentPage;
      param.pageNum = this.pageSize;
      param.loginId = this.loginId;
      param.userName = this.userNames;
      param.operType = this.operType;
      param.beginDate = this.beginDate;
      param.endDate = this.endDate;
      param.operId = sessionStorage.loginId;
      Api.queryOperLog(param)

        .then(res => {
          this.coverShow = false;
          let result = res.data;
          if (result.resultCode == "1") {
            this.tableData = result.data.operLogList;
            this.totalNum = result.data.total;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.btnLine {
  margin-top: 0.05rem;
}
</style>
