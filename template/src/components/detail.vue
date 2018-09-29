<template>
  <div class="detail_Box">
    <div class="title_box">
      <span>{{mytitle}}</span>
    </div>
    <div class="table_box">
        {{tableData}}
      <el-table :data="tableData">

        <el-table-column :label="item.label" :prop="item.value" v-for="item in tableData" :key="item.id">
          {{item}}
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "eRongDetail",
    props: ["mytitle", "tableData"],
    data() {
      return {

      };
    },
    created:{

    },
    methods:{
        getColData(data){
            for(let obj in data){
                
            }
        }
    }
  };
</script>
<style lang="scss" scoped>
</style>