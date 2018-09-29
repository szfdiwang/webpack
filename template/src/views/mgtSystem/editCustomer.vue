<template>
	<div class="willer-Bg">
		<div class="title_box">
			<span class="titleFont">用户信息修改</span>
		</div>
		<div class="check-box">
			<div class="left_content_box">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1rem">
					<div class="tab_line_inner_box">
						<el-form-item label="登录名:" prop="loginId">
							<el-input size="mini" :disabled="true" v-model="ruleForm.loginId" placeholder="请输入登录名"></el-input>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="姓名:" prop="userName">
							<el-input size="mini" v-model="ruleForm.userName" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="合作方类型:" prop="pbType">
							<el-select size="mini" v-model="ruleForm.pbType" placeholder="请选择合作方类型" @change="pbTypeChange">
								<el-option v-for="item in pbTypes" :key="item.codeNo" :label="item.codeName" :value="item.codeNo"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="归属合作方:" prop="partnerNo">
							<el-select size="mini" v-model="ruleForm.partnerNo" placeholder="请选择归属合作方">
								<el-option v-for="item in partner" :key="item.partnerNo" :label="item.partnerName" :value="item.partnerNo"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="邮箱:">
							<el-input size="mini" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="手机号:">
							<el-input size="mini" v-model="ruleForm.telPhone" placeholder="请输入手机号"></el-input>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="是否有效:" prop="status">
							<el-radio-group v-model="ruleForm.status">
								<el-radio label="1">有效</el-radio>
								<el-radio label="0">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<div class="tab_line_inner_box">
						<el-form-item label="备注:">
							<el-input type="textarea" size="mini" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
						</el-form-item>
					</div>
					<el-form-item style="margin-top:.2rem;">
						<el-button @click="edit('ruleForm')" size="mini" type="primary">确定</el-button>
						<el-button @click="backFn()" size="mini" type="primary">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="right_content_box">
				<img style="width:100%;" src="@/assets/pageImg/additem.png">
			</div>
		</div>
		<loading :shall-we-talk="coverShow"></loading>
	</div>
</template>
<script>
import Api from "@/Api/index";
export default {
  name: "editCustomer",
  mounted() {
    this.initData();
    this.initgetValueTypeSelect();
  },
  data() {
    return {
      coverShow: false, //遮罩层
      pbTypes: [],
      partner: [],
      ruleForm: {
        loginId: "",
        userName: "",
        pbType: "",
        partnerNo: "",
        partnerName: "",
        email: "",
        telPhone: "",
        status: "",
        remark: ""
      },
      rules: {
        loginId: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        pbType: [
          {
            required: true,
            message: "请选择合作方类型",
            trigger: "blur"
          }
        ],
        partnerNo: [
          {
            required: true,
            message: "请选择归属合作方",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择是否有效",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    backFn() {
      this.$router.push({
        name: "userMgt"
      });
    },
    //查询码值
    initgetValueTypeSelect() {
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
    initData() {
      this.coverShow = true;
      this.ruleForm = this.$route.params.data;
      let param = {};
      param.pbType = this.ruleForm.pbType;
      param.status = "1";
      param.operId = sessionStorage.loginId;
      Api.queryPartner(param)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
            this.partner = result.data.partnerList;
            this.coverShow = false;
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
        });
    },
    pbTypeChange(obj) {
      this.ruleForm.partnerNo = "";
      let param = {};
      param.pbType = obj;
      param.status = "1";
      param.operId = sessionStorage.loginId;
      Api.queryPartner(param)
        .then(res => {
          let result = res.data;
          if (result.resultCode == "1") {
            this.partner = result.data.partnerList;
          } else {
            this.$message({
              type: "error",
              message: res.data.errorDesc
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.coverShow = false;
        });
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {};
          param.loginId = this.ruleForm.loginId;
          param.userName = this.ruleForm.userName;
          param.pbType = this.ruleForm.pbType;
          param.partnerNo = this.ruleForm.partnerNo;
          let obj = {};
          obj = this.partner.find(item => {
            //这里的partner就是上面遍历的数据源
            return item.partnerNo === this.ruleForm.partnerNo; //筛选出匹配数据
          });
          param.partnerName = obj.partnerName;
          param.email = this.ruleForm.email;
          param.telPhone = this.ruleForm.telPhone;
          param.status = this.ruleForm.status;
          param.remark = this.ruleForm.remark;
          param.operId = sessionStorage.loginId;
          Api.updateCustomer(param)
            .then(res => {
              if (res.data.resultCode == "1") {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.$router.push({
                  name: "userMgt"
                });
              } else {
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
                message: "修改失败!"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.willer-Bg {
  font-size: 0.13rem;
  height: auto;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  min-height: 100%;
  .title_box {
    width: 9.8rem;
    height: 0.28rem;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.28rem;
    text-align: center;
    padding-top: 0.2rem;
    .titleFont {
      height: 0.56rem;
      line-height: 0.56rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      font-size: 0.18rem;
      background: #fff;
      text-align: center;
    }
  }
  .check-box {
    text-align: left;
    margin: 0 auto;
    height: auto;
    width: 9rem;
    overflow: hidden;
    position: relative;
    left: -0.2rem;
    .left_content_box {
      width: 50%;
      float: left;
    }
    .right_content_box {
      padding-top: 10%;
      width: 50%;
      float: left;
    }
  }
}

.el-form-item {
  margin-bottom: 0.15rem !important;
}
</style>