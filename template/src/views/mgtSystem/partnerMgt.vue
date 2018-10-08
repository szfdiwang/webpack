<template>
  <div class="bg_container">
    <div class="title_box">
      <span class="title_font">合作方管理</span>
    </div>
    <div class="sreach_box">
      <span class="sreach_box_title">查询条件</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>
      <div class="sreach_box_inputline">
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">合作方名称</span>
          <el-input class="sreach_input" size="mini" v-model="partnerName" placeholder="请输入合作方名称">
          </el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">合作方编号</span>
          <el-input class="sreach_input" size="mini" v-model="partnerNo" placeholder="请输入合作方编号">
          </el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">合作方类型</span>
          <el-select class="sreach_input" size="mini" v-model="pbType" placeholder="请选择合作方类型" clearable>
            <el-option v-for="item in pbTypes" :key="item.codeNo" :label="item.codeName" :value="item.codeNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btnLine">
        <el-button class="inputItemBtn" size="mini" icon="el-icon-search" type="primary" @click="searchFn">查询</el-button>
        <el-button class="inputItemBtn" size="mini" icon="el-icon-refresh" type="primary" @click="resetSearchBar">重置</el-button>
      </div>
    </div>
    <div class="table_box">
      <span class="table_box_title"  style="margin-top:.1rem">查询结果</span>
      <div style="clear:both;border-bottom:1px solid #D3D3D3;"></div>

      <div class="table_min_box">
        <!--<div class="detailBtn">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="stopPartner('0')">停用</el-button>
        </div>-->
        <el-table stripe border :data="tableData">
          <el-table-column label="" width="65">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60px" label="序号" type="index" :index="typeIndex"></el-table-column>
          <el-table-column align="center" label="合作方编号" prop="partnerNo"></el-table-column>
          <el-table-column align="center" label="合作方名称" prop="partnerName"></el-table-column>
          <el-table-column align="center" label="合作方类型" prop="pbType">
            <template slot-scope="scope">
              <div v-for="item in pbTypes" :key="item.codeNo">
                <div v-if="scope.row.pbType == item.codeNo">{{item.codeName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="status">
            <template slot-scope="scope">
              <div v-if="scope.row.status == '1'">有效</div>
              <div v-if="scope.row.status == '0'">停用</div>
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
import Api from "@/Api/index";
export default {
  name: "partnerMgt",
  mounted() {
  },
  created() {},
  data() {
    return {
      radio: -1,
      partnerNo: "",
      partnerName: "",
      pbTypes: [],
      pbType: "",
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
    stopPartner(status) {
      if (this.tableChecked) {
        var data = this.tableChecked;
        let param = {};
        param.partnerNo = data.partnerNo;
        param.status = status;
        Api.stopPartner(param)
          .then(res => {
            let result = res.data;
            if (result.resultCode == "1") {
              this.searchFn();
              this.$message({
                type: "success",
                message: "停用成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "停用失败!"
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.coverShow = false;
            this.$message({
              type: "error",
              message: err
            });
          });
      } else {
        this.$message({
          type: "error",
          message: "请选择一条合作方数据!"
        });
      }
    },
    getTemplateRow(index, row) {
      //获取选中数据
      this.tableChecked = row;
    },
    typeIndex(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    pageChange(p) {
      this.radio = -1;
      this.currentPage = p;
      this.initTable();
    },
    sizeChange(size) {
      this.radio = -1;
      this.pageSize = size;
      this.initTable();
    },
    searchFn() {
      this.radio = -1;
      this.currentPage = 1;
      this.initTable();
    },
    resetSearchBar() {
      this.radio = -1;
      this.partnerNo = "";
      this.partnerName = "";
      this.pbType = "";
      this.currentPage = 1;
      this.initTable();
    },
    //查询码值
    initstatusSelect() {
      let param = {};
      param.codeType = "pbType";
      Api.queryCodeLibrary(param)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
            this.pbTypes = result.data.codeList;
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
    },
    //查询参数
    initTable() {
      this.coverShow = true;
      let param = {};
      param.page = this.currentPage;
      param.pageNum = this.pageSize;
      param.partnerNo = this.partnerNo;
      param.partnerName = this.partnerName;
      param.pbType = this.pbType;
      param.operId = sessionStorage.loginId;
      Api.queryPartner(param)
        .then(res => {
          this.coverShow = false;
          let result = res.data;
          if (result.resultCode == "1") {
            this.tableData = result.data.partnerList;
            this.totalNum = result.data.total;
          } 
             else {
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