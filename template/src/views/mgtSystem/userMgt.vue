<template>
  <div class="bg_container">
    <div class="title_box">
      <span class="title_font">用户管理</span>
    </div>
    <div class="sreach_box">
      <span class="sreach_box_title">查询条件</span>
      <div style="clear:both;border-bottom:0.01rem solid #D3D3D3;"></div>
      <div class="sreach_box_inputline">
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">登录名</span>
          <el-input class="sreach_input" size="mini" v-model="loginIds" placeholder="请输入登录名">
          </el-input>
        </div>
        <div class="sreach_min_box">
          <span class="sreach_min_box_span">姓名</span>
          <el-input class="sreach_input" size="mini" v-model="userNames" placeholder="请输入姓名">
          </el-input>
        </div>
      </div>
      <div class="btnLine">
        <el-button class="inputItemBtn" size="mini" icon="el-icon-search" type="primary" @click="searchFn">查询</el-button>
        <el-button class="inputItemBtn" size="mini" icon="el-icon-refresh" type="primary" @click="resetSearchBar">重置</el-button>
      </div>
    </div>
    <div class="table_box">
      <span class="table_box_title"  style="margin-top:.1rem">查询结果</span>
      <div style="clear:both;border-bottom:0.01rem solid #D3D3D3;"></div>

      <div class="table_min_box">
        <div class="detailBtn">
          <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addCustomer()">新增</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateCustomer()">修改</el-button>
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteCustomer()">删除</el-button>
          <el-button type="primary" size="mini" icon="el-icon-setting" @click="queryRole()">用户角色</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="resetPass()">密码初始化</el-button>
        </div>
        <el-table stripe border :data="tableData">
          <el-table-column label="" width="65">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60px" label="序号" type="index" :index="typeIndex"></el-table-column>
          <el-table-column align="center" label="登录名" prop="loginId"></el-table-column>
          <el-table-column align="center" label="姓名" prop="userName"></el-table-column>
          <el-table-column align="center" label="手机号" prop="telPhone"></el-table-column>
          <el-table-column align="center" label="归属合作方" prop="partnerName">
          </el-table-column>
          <el-table-column align="center" label="合作方类型" prop="pbType">
            <template slot-scope="scope">
              <div v-for="(item) in pbTypes" :key="item.codeNo">
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
    <el-dialog :modal-append-to-body='false' style="font-size: .18rem;" center title="用户角色信息" :visible.sync="dialogTableVisible"
      width="6rem">
      <div style="clear:both;border-top:0.01rem solid #D3D3D3;"></div>
      <el-form>
        <el-form-item label="">
          <el-checkbox-group v-for="item in roleData" :key="item.roleId" v-model="roleId">
            <el-checkbox :label="item.roleId" name="roleId">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-top:0.6rem;margin-left: 2rem;">
          <el-button @click="addRole()" size="small" type="primary">确定</el-button>
          <el-button @click="dialogTableVisible = false" size="small" type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :modal-append-to-body='false' style="font-size: .18rem;" center title="修改密码" :visible.sync="dialogVisible"
      width="4rem">
      <div style="clear:both;border-top:0.01rem solid #D3D3D3;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1.2rem">
        <el-form-item label="请输入新密码:" prop="pass">
          <el-input size="mini" type="password" v-model="ruleForm.pass" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码:" prop="confPassword">
          <el-input size="mini" type="password" v-model="ruleForm.confPassword" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:0.1rem;">
          <el-button @click="resetPassword('ruleForm')" size="small" type="primary">确定</el-button>
          <el-button @click="dialogVisible = false" size="small" type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import md5 from "js-md5";
  import Api from "@/Api/index";
  export default {
    name: "userMgt",
    mounted() {
    },
    created() {},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        radio: -1,
        loginIds: "",
        userNames: "",
        pbTypes: [],
        belongPbTypes: [],
        tableChecked: "",
        coverShow: false,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        totalNum: 0,
        showClose: false,
        showTable: false,
        switchStatus: "全部收起",
        switchFlag: false,
        dialogTableVisible: false,
        roleData: {},
        roleId: [],
        dialogVisible: false,
        ruleForm: {
          pass: "123456",
          confPassword: "123456"
        },
        rules: {
          pass: [{
              required: true,
              message: "请输入新密码",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符或数字",
              trigger: "blur"
            }
          ],
          confPassword: [{
              required: true,
              message: "请确认新密码",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符或数字",
              trigger: "blur"
            },
            {
              validator: validatePass,
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      updateCustomer() {
        if (this.tableChecked) {
          var data = this.tableChecked;
          this.$router.push({
            name: "editCustomer",
            params: {
              data: data
            }
          }); //flg为N时候只有查看权限
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
        }
      },
      //删除
      deleteCustomer() {
        if (this.tableChecked) {
          this.$confirm("确定要删除此数据吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              let param = {};
              param.loginId = this.tableChecked.loginId;
              param.operId = sessionStorage.loginId;
              Api.deleteCustomer(param)
                .then(res => {
                  let result = res.data;
                  if (result.resultCode == "1") {
                    this.searchFn();
                    this.radio = -1;
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: "删除失败!"
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.coverShow = false;
                  this.$message({
                    type: "error",
                    message: "删除失败!"
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
        }
      },
      //用户角色
      queryRole() {
        if (this.tableChecked) {
          this.dialogTableVisible = true;
          this.roleId = [];
          let param = {};
          param.operId = sessionStorage.loginId;
          Api.queryUserRole(param)
            .then(res => {
              let result = res.data;
              if (result.resultCode == "1") {
                this.roleData = result.data.roleList;
                console.log(this.roleData);
                param.loginId = this.tableChecked.loginId;
                Api.queryUserRole(param)
                  .then(res => {
                    let result = res.data;
                    if (result.resultCode == "1") {
                      let roles = result.data.roleList;
                      for (let role of roles) {
                        this.roleId.push(role.roleId);
                      }
                      console.log(this.roleId);
                    } else {
                      this.$message({
                        type: "error",
                        message: "获取用户角色失败!"
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    this.coverShow = false;
                    this.$message({
                      type: "error",
                      message: "获取用户角色失败!"
                    });
                  });
              } else {
                this.$message({
                  type: "error",
                  message: "获取用户角色失败!"
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.coverShow = false;
              this.dialogTableVisible = false;
            });
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
        }
      },
      addRole() {
        if (this.tableChecked) {
          let param = {};
          param.loginId = this.tableChecked.loginId;
          param.operId = sessionStorage.loginId;
          param.roleList = this.roleId;
          Api.addUserRole(param)
            .then(res => {
              let result = res.data;
              if (result.resultCode == "1") {
                this.$message({
                  type: "success",
                  message: "添加用户角色成功!"
                });
                this.dialogTableVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "添加用户角色失败!"
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.coverShow = false;
              this.$message({
                type: "error",
                message: "添加用户角色失败!"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
        }
      },
      resetPass() {
        if (this.tableChecked) {
          this.dialogVisible = true;
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
        }
      },
      //密码初始化
      resetPassword(formName) {
        if (this.tableChecked) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              let param = {};
              param.loginId = this.tableChecked.loginId;
              param.password = md5(this.ruleForm.pass);
              param.operId = sessionStorage.loginId;
              Api.resetPassword(param)
                .then(res => {
                  if (res.data.resultCode == "1") {
                    this.$message({
                      type: "success",
                      message: "密码初始化成功!"
                    });
                    this.dialogVisible = false;
                  } else {
                    this.$message({
                      type: "error",
                      message: res.data.errorDesc
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$message({
                    type: "error",
                    message: "密码初始化失败!"
                  });
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请选择一条用户数据!"
          });
          this.dialogVisible = false;
        }
      },
      getTemplateRow(index, row) {
        //获取选中数据
        this.tableChecked = row;
      },
      //新增
      addCustomer() {
        this.$router.push({
          name: "addCustomer"
        });
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
        this.loginIds = "";
        this.userNames = "";
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
            //  else {
            //   this.$message({
            //     type: "error",
            //     message: esult.errorDesc
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
        param.loginId = this.loginIds;
        param.userName = this.userNames;
        param.operId = sessionStorage.loginId;
        Api.queryCustomer(param)
          .then(res => {
            let result = res.data;
            if (result.resultCode == "1") {
              this.tableData = result.data.userInfoList;
              this.totalNum = result.data.total;
              this.coverShow = false;
            } 
               else {
                 this.coverShow = false;
                 this.$message({
                   type: "error",
                   message: result.errorDesc
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