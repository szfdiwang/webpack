<template>
  <div>
    <el-dialog :modal-append-to-body='false' style="font-size: .18rem;" center title="修改密码" :before-close="handleClose" @close="close" :visible.sync="showDialog"
      width="4rem">
      <div style="clear:both;border-top:0.01rem solid #D3D3D3;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1.2rem">
        <el-form-item label="请输入新密码:" prop="pass">
          <el-input size="mini" type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码:" prop="confPassword">
          <el-input size="mini" type="password" v-model="ruleForm.confPassword" auto-complete="off" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:0.1rem;">
          <el-button @click="resetPassword('ruleForm')" size="small" type="primary">确定</el-button>
          <el-button @click="close" size="small" type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import md5 from "js-md5";
import Api from "@/Api/index";
export default {
  name: "dialogPwd",
  props: ["showDialog"],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        confPassword: ""
      },
      //   dialogVisible: this.showDialog,
      rules: {
        pass: [
          {
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
        confPassword: [
          {
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
    handleClose() {
      this.$emit("close", null);
    },
    close() {
      this.ruleForm.pass = "";
      this.ruleForm.confPassword = "";
      this.handleClose();
    },
    //密码初始化
    resetPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {};
          param.loginId = sessionStorage.loginId;
          param.password = md5(this.ruleForm.pass);
          param.operId = sessionStorage.loginId;
          Api.resetPassword(param)
            .then(res => {
              if (res.data.resultCode == "1") {
                this.$message({
                  type: "success",
                  message: "修改密码成功!"
                });
                this.handleClose();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errorDesc
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.handleClose();
              this.$message({
                type: "error",
                message: "修改密码失败!"
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
</style>