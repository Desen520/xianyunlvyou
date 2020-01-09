<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="cacheFlightsData" @setListData="setListData" />

        <!-- 航班头部布局 -->
        <flightsHead />

        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in listData" :key="index" :data="item" />
        <!-- size-change切换条数的时候触发的事件 -->
        <!-- current-change选择页数的时候触发的事件 -->
        <!-- current-page当前的页数 -->
        <!-- page-size当前一页有多少条数据 -->
        <!-- page-sizes设置一页有多少数据 -->
        <!-- total该数据的总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsData.total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsHead from "@/components/air/flightshead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsfilters";
export default {
  data() {
    return {
      flightsData: {
        info: [],
        flights: [],
        options: {},
        
      },
      cacheFlightsData: {
        info: [],
        flights: [],
        options: {},
      
      },
      listData: [],
      pageIndex: 1,
      pageSize: 5
    };
  },
  methods: {
    //   切换条数事件 传入需要一页多少条数据值 val
    handleSizeChange(val) {
      // 再把传进来的值附到pageSize条数值上
      this.pageSize = val;
      //   设置当前页数
      this.pageIndex = 1;
      this.setListData();
    },
    //选择页数事件 点击的页数传入进去 参数为val
    handleCurrentChange(val) {
      // 把传进来的值赋到pageIndex上 改变他的当前页数值
      this.pageIndex = val;
      this.setListData();
    },
    setListData(arr) {
      if (arr) {
        this.pageIndex = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.listData = this.flightsData.flights.slice(start, end);
    },
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data };
         // this.listData = this.flightsData.flights;
        this.setListData();
      });
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    flightsHead,
    flightsItem,
    flightsFilters
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>