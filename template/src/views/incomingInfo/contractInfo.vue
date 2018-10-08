<template>
  <div class="contractInfo_Bg">
    <loading :shall-we-talk="coverShow"></loading>
    <div class="tab_line">
      <el-tabs tab-position="left" @tab-click="handleClick" :before-leave="beforeFn">
        <el-tab-pane label="基本信息" value="">
          <div class="tab_box">
            <div class="tab1_line1">
              <span>合同基本信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
                <div class="tab_line_inner_box">
                  <span>合同编号</span>
                  <el-input size="mini" disabled v-model="contractNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>产品名称</span>
                  <el-input size="mini" disabled v-model="applyProdName" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>还款方式</span>
                  <el-input size="mini" disabled v-model="applyRepayType" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>贷款金额</span>
                  <el-input size="mini" disabled v-model="finalLmt" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>利率</span>
                  <el-input size="mini" disabled v-model="applyLoanRate" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>贷款用途</span>
                  <el-input size="mini" disabled v-model="applyLoanPurpose" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>申请成数</span>
                  <el-input size="mini" disabled v-model="applyPer" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>准入方式</span>
                  <el-input size="mini" disabled v-model="allowWay" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>收入认定方式</span>
                  <el-input size="mini" disabled v-model="incomeWay" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>月收入</span>
                  <el-input size="mini" disabled v-model="incomeMonth" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>月负债</span>
                  <el-input size="mini" disabled v-model="debtMonth" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>服务费率</span>
                  <el-input size="mini" disabled v-model="serviceCharge" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>申请件类型</span>
                  <el-input size="mini" disabled v-model="appType" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>手续费收取方式</span>
                  <el-input size="mini" disabled v-model="collectionWay" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>亿车流水号</span>
                  <el-input size="mini" disabled v-model="applySerialNo" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="tab1_line1">
              <span>主借人信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
                <div class="tab_line_inner_box">
                  <span>姓名</span>
                  <el-input size="mini" disabled v-model="name" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>性别</span>
                  <el-input size="mini" disabled v-model="gender" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>证件类型</span>
                  <el-input size="mini" disabled v-model="idType" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>证件号码</span>
                  <el-input size="mini" disabled v-model="idNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>婚姻状况</span>
                  <el-input size="mini" disabled v-model="maritalStatus" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>手机号码</span>
                  <el-input size="mini" disabled v-model="cellPhone" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>详细地址</span>
                  <el-input size="mini" disabled v-model="abodeDetail" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>住房状况</span>
                  <el-input size="mini" disabled v-model="houseCondition" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>电子邮箱</span>
                  <el-input size="mini" disabled v-model="email" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>生日</span>
                  <el-input size="mini" disabled v-model="birthday" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>QQ号码</span>
                  <el-input size="mini" disabled v-model="qq" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>固定电话</span>
                  <el-input size="mini" disabled v-model="fixedPhone" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>工作状况</span>
                  <el-input size="mini" disabled v-model="workCondition" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>工作单位</span>
                  <el-input size="mini" disabled v-model="unitName" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>单位详细地址</span>
                  <el-input size="mini" disabled v-model="empAdd" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>单位电话</span>
                  <el-input size="mini" disabled v-model="empPhone" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>行业</span>
                  <el-input size="mini" disabled v-model="occupation" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>户籍省</span>
                  <el-input size="mini" disabled v-model="householdProvince" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>户籍市</span>
                  <el-input size="mini" disabled v-model="householdCity" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>文化程度</span>
                  <el-input size="mini" disabled v-model="degreeEdu" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="tab1_line1">
              <span>银行卡信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
                <div class="tab_line_inner_box">
                  <span>持卡人姓名</span>
                  <el-input size="mini" disabled v-model="bankUserName" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>持卡人身份证</span>
                  <el-input size="mini" disabled v-model="bankUserId" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>银行预留号码</span>
                  <el-input size="mini" disabled v-model="bankReservePhone" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>银行名称</span>
                  <el-input size="mini" disabled v-model="bankName" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>银行卡号</span>
                  <el-input size="mini" disabled v-model="bankCardNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>银行所在省名称</span>
                  <el-input size="mini" disabled v-model="bankProvinceCode" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>银行所在市名称</span>
                  <el-input size="mini" disabled v-model="bankCityCode" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="tab1_line1">
              <span>车辆信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
                <div class="tab_line_inner_box">
                  <span>车牌号码</span>
                  <el-input size="mini" disabled v-model="carLicNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆品牌</span>
                  <el-input size="mini" disabled v-model="carBrand" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆版本</span>
                  <el-input size="mini" disabled v-model="carVersion" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆型号</span>
                  <el-input size="mini" disabled v-model="carChassisNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>发动机号</span>
                  <el-input size="mini" disabled v-model="carEngineNo" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>颜色</span>
                  <el-input size="mini" disabled v-model="carColor" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆里程</span>
                  <el-input size="mini" disabled v-model="carMileage" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆排量</span>
                  <el-input size="mini" disabled v-model="displacement" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>网核评估价</span>
                  <el-input size="mini" disabled v-model="price" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>新车指导价</span>
                  <el-input size="mini" disabled v-model="newCarPrice" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>折旧价</span>
                  <el-input size="mini" disabled v-model="depreciationPrice" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>车辆首次登记时间</span>
                  <el-input size="mini" disabled v-model="regTime" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>担保方式</span>
                  <el-input size="mini" disabled v-model="guaType" placeholder=""></el-input>
                </div>
              </div>
            </div>
            <div class="tab1_line1">
              <span>业务信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
                <div class="tab_line_inner_box">
                  <span>渠道</span>
                  <el-input size="mini" disabled v-model="applyChannel" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>归属省</span>
                  <el-input size="mini" disabled v-model="affProvince" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>归属市</span>
                  <el-input size="mini" disabled v-model="affCity" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>归属区</span>
                  <el-input size="mini" disabled v-model="affDistricts" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>归属团队</span>
                  <el-input size="mini" disabled v-model="affTeam" placeholder=""></el-input>
                </div>
                <div class="tab_line_inner_box">
                  <span>归属客户经理</span>
                  <el-input size="mini" disabled v-model="affManager" placeholder=""></el-input>
                </div>
                <!-- <div class="tab_line_inner_box">
                  <span>内控人员</span>
                  <el-input size="mini" disabled v-model="myinput" placeholder=""></el-input>
                </div> -->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="共借人信息">
          <div class="tab_box">
            <div class="tab1_line1">
              <span>共借人信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
              </div>
              <div>
                <el-table stripe fit highlight-current-row class="searchTable" border :data="borrowInfotableData">
                  <el-table-column align="center" label="姓名" prop="guarantName"></el-table-column>
                  <el-table-column align="center" label="证件号码" prop="certId"></el-table-column>
                  <el-table-column align="center" label="关系" prop="relationShip"></el-table-column>
                  <el-table-column align="center" label="详细地址" prop="abodeDetail"></el-table-column>
                  <el-table-column align="center" label="工作单位" prop="unitName"></el-table-column>
                  <el-table-column align="center" label="单位详细地址" prop="empAdd"></el-table-column>
                  <el-table-column align="center" label="单位电话" prop="empPhone"></el-table-column>
                  <el-table-column align="center" label="手机号码" prop="mobilePhone"></el-table-column>
                  <el-table-column align="center" label="是否为黑名单" prop="isBlack"></el-table-column>
                  <el-table-column align="center" label="是否主推送人" prop="isMainPush"></el-table-column>
                  <el-table-column align="center" width="210" label="操作" prop="option">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" class="insideBtn" @click="openShield(scope.row)">同盾</el-button>
                        <el-button type="primary" size="mini" class="insideBtn" @click="openSesame(scope.row)">芝麻</el-button>
                        <el-button type="primary" size="mini" class="insideBtn" @click="openFahai(scope.row)">法海</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="担保人信息">
          <div class="tab_box">
            <div class="tab1_line1">
              <span>担保人信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
              </div>
              <div>
                <el-table stripe fit highlight-current-row class="searchTable" border :data="guaranteeInfotableData">
                  <el-table-column align="center" label="姓名" prop="guarantName"></el-table-column>
                  <el-table-column align="center" label="证件号码" prop="certId"></el-table-column>
                  <el-table-column align="center" label="关系" prop="relationShip"></el-table-column>
                  <el-table-column align="center" label="详细地址" prop="abodeDetail"></el-table-column>
                  <el-table-column align="center" label="工作单位" prop="unitName"></el-table-column>
                  <el-table-column align="center" label="单位详细地址" prop="empAdd"></el-table-column>
                  <el-table-column align="center" label="单位电话" prop="empPhone"></el-table-column>
                  <el-table-column align="center" label="手机号码" prop="mobilePhone"></el-table-column>
                  <el-table-column align="center" label="是否为黑名单" prop="isBlack"></el-table-column>
                  <el-table-column align="center" label="是否主推送人" prop="isMainPush"></el-table-column>
                  <el-table-column align="center" width="80" label="操作" prop="option">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" class="insideBtn" @click="openFahai(scope.row)">法海</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系人信息">
          <div class="tab_box">
            <div class="tab1_line1">
              <span>联系人信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
              </div>
              <div>
                <el-table stripe fit highlight-current-row class="searchTable" border :data="contactInfotableData">
                  <el-table-column align="center" label="联系人姓名" prop="contactName"></el-table-column>
                  <el-table-column align="center" label="关系" prop="relationShip"></el-table-column>
                  <el-table-column align="center" label="手机号码" prop="mobilePhone"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="共借企业信息">
          <div class="tab_box">
            <div class="tab1_line1">
              <span>共借企业信息</span>
              <div class="rowline"></div>
              <div class="tab_line_box">
              </div>
              <div>
                <el-table stripe fit highlight-current-row class="searchTable" border :data="companyInfotableData">
                  <el-table-column align="center" label="企业名称" prop="enterpriseName"></el-table-column>
                  <el-table-column align="center" label="营业执照编码" prop="registrationNo"></el-table-column>
                  <el-table-column align="center" label="开户许可证" prop="accountPermit"></el-table-column>
                  <el-table-column align="center" label="信用码" prop="creditCode"></el-table-column>
                  <el-table-column align="center" label="注册地址" prop="registerAdd"></el-table-column>
                  <el-table-column align="center" label="注册时间" prop="registerAdd"></el-table-column>
                  <el-table-column align="center" label="法人代表" prop="legalPerson"></el-table-column>
                  <el-table-column align="center" label="单位地址" prop="empAdd"></el-table-column>
                  <el-table-column align="center" label="单位电话" prop="empPhone"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="影像信息">
          影像信息
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Api from "@/Api/index";
export default {
  name: "contractInfo",
  data() {
    return {
      coverShow: false,
      borrowInfotableData: [], //共借人信息
      guaranteeInfotableData: [], //担保人信息
      contactInfotableData: [],
      companyInfotableData: [],
      /**
       * 基本信息
       */
      // contractNo: "", //合同编号
      applyProdName: "", //产品名称
      applyRepayType: "", //还款方式
      finalLmt: "", //贷款金额
      applyLoanRate: "", //利率
      applyLoanPurpose: "", //贷款用途,
      finalTerm: "", //贷款期数
      applyPer: "", //申请成数
      allowWay: "", //准入方式
      incomeWay: "", //收入认定方式
      incomeMonth: "", //月收入
      debtMonth: "", //月负债
      serviceCharge: "", //服务费率
      appType: "", //申请件类型
      collectionWay: "", //手续费收取方式
      applySerialNo: "", //亿车流水号
      /**
       *主借人信息
       */
      name: "", //主借人姓名
      gender: "", //性别
      idType: "", //证件类型
      idNo: "", //证件号码
      maritalStatus: "", //婚姻状况
      cellPhone: "", //手机
      abodeDetail: "", //详细地址
      houseCondition: "", //住房
      email: "", //电子邮箱
      birthday: "", //生日
      qq: "", //QQ邮箱
      fixedPhone: "", //固定电话
      workCondition: "", //工作状况
      unitName: "", //工作单位
      empAdd: "", //单位地址
      empPhone: "", //单位电话
      occupation: "", //行业
      householdProvince: "", //户籍所在省
      householdCity: "", //户籍所在市
      degreeEdu: "", //文化程度

      /**
       *银行卡信息
       */
      bankUserName: "", //持卡人姓名
      bankUserId: "", //持卡人身份证
      bankReservePhone: "", //银行预留号码
      bankName: "", //银行名称
      bankCardNo: "", //卡号
      bankProvinceCode: "", //银行所在省编号
      bankCityCode: "", //所在市
      /**
       * 车辆信息
       */
      carLicNo: "", //车辆信息
      carBrand: "", //车辆品牌
      carVersion: "", //车辆版本
      carChassisNo: "", //车辆型号
      carEngineNo: "", //发动机号
      carColor: "", //颜色
      carMileage: "", //车辆历程
      displacement: "", //车辆排量
      price: "", //网核价格
      newCarPrice: "", //新车价格
      depreciationPrice: "", //折旧价
      regTime: "", //车辆首次登记时间
      guaType: "", //担保方式
      /**
       * 业务
       */
      applyChannel: "", //渠道
      affProvince: "", //归属省
      affCity: "", //归属市
      affDistricts: "", //归属区\
      affTeam: "", //归属团队\
      affManager: "" //归属客户经理
    };
  },
  mounted() {
  },
  computed: {
    contractNo: {
      get: function() {
        if (this.$route.params.data) {
          return this.$route.params.data.contractNo;
        } else {
          return sessionStorage.contractInfo;
        }
      },
      set: function() {
        return sessionStorage.contractInfo;
      }
    }
  },
  methods: {
    openinsider(row) {
      sessionStorage.borrowManId = row.certId;
      console.log(row);
      var width = 1000; //弹出窗口的宽度;
      var height = 600; //弹出窗口的高度;
      var top = (window.screen.availHeight - height) / 2; //窗口的垂直位置;
      var left = (window.screen.availWidth - width) / 2; //窗口的水平位置;
      window.open(
        `#/incomingInfo/queryDetail/insiderShild`,
        "_blank",
        "height=" +
          height +
          ",width=" +
          width +
          ",top=" +
          top +
          ",left=" +
          left +
          ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no"
      );
    },
    openSesame(row) {
      sessionStorage.insiderPage = "ZHIMA";
      this.openinsider(row);
    },
    openFahai(row) {
      sessionStorage.insiderPage = "FAHAI";
      this.openinsider(row);
    },
    openShield(row) {
      sessionStorage.insiderPage = "TONGDUN";
      this.openinsider(row);
    },
    initBase() {
      this.coverShow = true;
      // this.contractNo = this.$route.params.data;
      let data = {
        contractNo: this.contractNo
      };
      Api.queryMainInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            /*基本信息 */
            this.applyProdName = res.data.data.applyProdName;
            this.applyRepayType = res.data.data.applyRepayType;
            this.finalLmt = res.data.data.finalLmt;
            this.applyLoanRate = res.data.data.applyLoanRate;
            this.applyLoanPurpose = res.data.data.applyLoanPurpose;
            this.finalTerm = res.data.data.finalTerm;
            this.applyPer = res.data.data.applyPer;
            this.allowWay = res.data.data.allowWay;
            this.incomeWay = res.data.data.incomeWay;
            this.incomeMonth = res.data.data.incomeMonth;
            this.debtMonth = res.data.data.debtMonth;
            this.serviceCharge = res.data.data.serviceCharge;
            this.appType = res.data.data.appType;
            this.applySerialNo = res.data.data.applySerialNo;
            this.collectionWay = res.data.data.collectionWay;
            /*主借人信息 */
            this.name = res.data.data.Name;
            this.gender = res.data.data.gender;
            this.idType = res.data.data.idType;
            this.idNo = res.data.data.idNo;
            this.maritalStatus = res.data.data.maritalStatus;
            this.cellPhone = res.data.data.cellPhone;
            this.abodeDetail = res.data.data.abodeDetail;
            this.houseCondition = res.data.data.houseCondition;
            this.email = res.data.data.email;
            this.birthday = res.data.data.birthday;
            this.qq = res.data.data.qq;
            this.fixedPhone = res.data.data.fixedPhone;
            this.workCondition = res.data.data.workCondition;
            this.unitName = res.data.data.unitName;
            this.empAdd = res.data.data.empAdd;
            this.empPhone = res.data.data.empPhone;
            this.occupation = res.data.data.occupation;
            this.householdProvince = res.data.data.hjProvinceCode; //户籍所在省
            this.householdCity = res.data.data.hjCityCode; //户籍所在市
            this.degreeEdu = res.data.data.qualification; //文化程度
            /*银行卡信息 */
            this.bankUserName = res.data.data.bankUserName;
            this.bankUserId = res.data.data.bankUserId;
            this.bankReservePhone = res.data.data.bankReservePhone;
            this.bankName = res.data.data.bankName;
            this.bankCardNo = res.data.data.bankCardNo;
            this.bankProvinceCode = res.data.data.bankProvinceCode;
            this.bankCityCode = res.data.data.bankCityCode;
            /*车辆信息 */
            this.carLicNo = res.data.data.carLicNo;
            this.carBrand = res.data.data.carBrand;
            this.carVersion = res.data.data.carVersion;
            this.carChassisNo = res.data.data.carChassisNo;
            this.carEngineNo = res.data.data.carEngineNo;
            this.carColor = res.data.data.carColor;
            this.carMileage = res.data.data.carMileage;
            this.displacement = res.data.data.displacement;
            this.price = res.data.data.price;
            this.newCarPrice = res.data.data.newCarPrice;
            this.depreciationPrice = res.data.data.depreciationPrice;
            this.regTime = res.data.data.regTime;
            this.guaType = res.data.data.guaType;
            /**
             * 业务信息
             */
            this.applyChannel = res.data.data.applyChannel;
            this.affProvince = res.data.data.affProvince;
            this.affCity = res.data.data.affCity;
            this.affDistricts = res.data.data.affDistricts;
            this.affTeam = res.data.data.affTeam;
            this.affManager = res.data.data.affManager;
            //barcode
            sessionStorage.barcode = res.data.data.barcode;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: "查询基本信息失败"
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
    initContractMan() {
      this.coverShow = true;
      let data = {
        contractNo: this.contractNo
      };
      Api.queryLinkmanInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.contactInfotableData = res.data.data;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: "查询联系人失败"
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
    initBorrowCompany() {
      this.coverShow = true;
      let data = {
        contractNo: this.contractNo
      };
      Api.queryCommonEnterpriseInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
          	this.companyInfotableData = res.data.data;
          }
          //  else {
          //   this.$message({
          //     type: "error",
          //     message: "查询共借企业失败"
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
    initBorrowInfo() {
      this.coverShow = true;
      let data = {
        contractNo: this.contractNo
      };
      Api.queryCommonBorrowerInfo(data)
        .then(res => {
          this.coverShow = false;
          if (res && res.data.resultCode == "1") {
            this.borrowInfotableData = res.data.data.commonBorrowers;
            this.guaranteeInfotableData = res.data.data.guarantees;
          }
          // else {
          //   this.$message({
          //     type: "error",
          //     message: "查询共借人失败"
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
    handleClick(tab, eve) {
      if (tab.label == "影像信息") {
        if (
          sessionStorage.barcode === "undefined" ||
          sessionStorage.barcode === ""
        ) {
          this.$message({
            type: "warning",
            message: "该客户暂无影像信息"
          });
          return;
        }
        let data = {
          appid: "pbes1001",
          userid: sessionStorage.loginId,
          username: sessionStorage.userName,
          ip: "127.0.0.1",
          barcode: sessionStorage.barcode,
          doctypeid: "400",
          right: "1",
          phase: "0",
          organization: "pbes",
          source: "pbes",
          browerId: "pbes",
          ba: "pbes"
        };
        this.coverShow = true;
        Api.queryCctv(data)
          .then(res => {
            this.coverShow = false;
            if (res && res.data.resultCode == "1") {
              let path = res.data.data.parameter;
              let url = "";
              if (process.env && process.env.NODE_ENV == "production") {
                url = "http://api.myerong.com/asssets/inner/img"; //生产
              } else if (
                process.env &&
                process.env.NODE_ENV == "sitEnvironment"
              ) {
                url = "http://192.168.11.66/inner/img"; //测试
              } else if (process.env && process.env.NODE_ENV == "development") {
                url = "/apis"; //开发
              }

              window.open(
                url +
                  "/index.html?requestParameter=" +
                  path +
                  "&right=1" +
                  "&authorization=bearer " +
                  sessionStorage.token,
                "_blank",
                "width=800,height=600,top=100,left=200"
              );
            }
            // else {
            //   this.$message({
            //     type: "error",
            //     message: "查询共借人失败"
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
      } else if (tab.label == "共借人信息" || tab.label == "担保人信息") {
        this.initBorrowInfo();
      } else if (tab.label == "联系人信息") {
        this.initContractMan();
      } else if (tab.label == "共借企业信息") {
        this.initBorrowCompany();
      }
    },
    beforeFn(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);
      if (activeName == 5) {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.insideBtn {
  float: left;
}
</style>
