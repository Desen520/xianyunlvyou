<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" >
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" >
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" >
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" >
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{flightDatas}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ],
      airport: "",
      flightTimes: "",
      company: "",
      airSize: ""
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    flightDatas(){
      var arr=this.data.flights.filter(item=>{
        let valid=true
        //选择机场
       if(this.airport && this.airport!==item.org_airport_name){
         valid=false
       }
  // 选择航空
       if(this.company && this.company!==item.airline_name){
         valid=false
       }
  //选择时间
       if(this.flightTimes){
         const [form,go]=this.flightTimes.split(',');
         const start=item.dep_time.split(':')[0];
         if( start >= +form && start < +go ){
           valid=false
         }
         
       }
      //选择大小
       if(this.airSize && this.airSize!==item.plane_size){
         valid=false
       }
       return valid;
      });
      this.$emit("setListData",arr);
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    // handleAirport(value) {
    //  const arr =this.data.flights.filter(v=>
    //  v.org_airport_name===value
    //  );
    //  this.$emit("setListData",arr)
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   const [from,to]=value.split(',');
    //   //找出from与to之间中的航班飞机
      
    //   const arr=this.data.flights.filter(v=>{
    //     const start=+v.dep_time.split(':')[0];
    //     // console.log(start)
    //     return start>=+from&& start<+to;
    //   });
     
    //   this.$emit("setListData",arr)
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   const arr=this.data.flights.filter(v=>
    //   v.airline_name===value
    //   );
    //   this.$emit("setListData",arr)
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
      
    //   const arr=this.data.flights.filter(v=>
    //   v.plane_size===value
    //   );
    //   this.$emit("setListData",arr)
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport='';
      this.flightTimes='';
      this.company='';
      this.airSize='';
    //  const arr=this.data.flights
      // this.$emit("setListData", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>