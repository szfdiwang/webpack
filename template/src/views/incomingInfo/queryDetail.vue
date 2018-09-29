<template>
  <div class="detail_container">
    <el-tabs class="tab_box" v-model="activeName2" type="card" value="contractInfo" :before-leave="beforeFn" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.id" :name="item.name" :label="item.label">
      </el-tab-pane>
         <router-view></router-view>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "queryDetail",
  data() {
    return {
      tabList: [
        {
          id: "1",
          label: "合同信息",
          name: "contractInfo"
        },
        {
          id: "2",
          label: "历史审批",
          name: "approvalHistory"
        },
        {
          id: "3",
          label: "电话查询历史",
          name: "phoneCheckHistory"
        },
        {
          id: "4",
          label: "同盾信息",
          name: "shieldInfo"
        },
        {
          id: "5",
          label: "芝麻信用",
          name: "sesameCredit"
        },
        {
          id: "6",
          label: "法海风控",
          name: "fahaiRiskMgt"
        }
      ]
    };
  },
  computed: {
    activeName2: {
      get: function() {
        return "contractInfo";
      },

      set: function() {}
    }
  },
  methods: {
    beforeFn(a, b) {
      sessionStorage.setItem("curTab", a);
      var data = this.$route.params.data;
      if (!data) {
        data = sessionStorage.contractInfo;
      }
      if (a == "contractInfo") {
        this.$router.push({
          name: a,
          params: {
            data: data
          }
        });
      } else {
        var width = 1000; //弹出窗口的宽度;
        var height = 600; //弹出窗口的高度;
        var top = (window.screen.availHeight - height) / 2; //窗口的垂直位置;
        var left = (window.screen.availWidth - width) / 2; //窗口的水平位置;
        window.open(
          `#/incomingInfo/queryDetail/${a}`,
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
        return false;
      }
    },
    handleClick(tab, event) {}
  }
};
</script>
<style lang="scss" scoped>
</style>