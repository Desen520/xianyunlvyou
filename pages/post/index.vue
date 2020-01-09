<template>
  <div class="postindex">
    <el-row type="flex">
      <el-col class="left" :span="6">
        <el-col v-for="(item,index) in postitem" :key="index" class="nav">
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-right"></i>
        </el-col>
        <el-col class="lefttuijian">
          <p>推荐城市</p>
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
        </el-col>
      </el-col>
      <el-col class="right" :span="18">
        <el-input placeholder="请输入想去的地方,比如:'广州' " v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="righttuijian">
          <span>推荐:</span>
          <a href="#">广州</a>
          <a href="#">上海</a>
          <a href="#">北京</a>
        </div>
        <div class="strategy">
         <p>推荐攻略</p>
         <el-button type="primary"><i class="el-icon-edit"></i>写游记</el-button>
        </div>
        <div class="strategynew">
          <strategyNews/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import strategyNews from '@/components/post/strategynew'
export default {
  data() {
    return {
      postitem: [
        { name: "热门城市" },
        { name: "推荐城市" },
        { name: "奔向海岛" },
        { name: "主题推荐" }
      ],
      input: ""
    };
  },
  components:{
   strategyNews
  },
  methods: {}
};
</script>

<style scoped lang="less">
.postindex {
  width: 1000px;
  margin: 0 auto;
}
.nav {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 15px;
  position: relative;
  z-index: 2;
  border: 1px solid #ddd;
}
.left {
  margin: 20px 0;
}
.el-icon-arrow-right {
  padding-left: 123px;
  font-size: 20px;
  color: #b8b8b8;
  box-sizing: border-box;
}
.lefttuijian {
  p {
    margin: 15px 0 10px 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }
  img {
    width: 100%;
  }
}
.right {
  padding: 20px 0 20px 40px;
}
.input-with-select {
  border: 3px solid orange;
}
/deep/.el-input-group__append {
  color: orange;
  font-size: 30px;
  border: none;
  background-color: white;
  // width: 20px;
  padding: 0 8px;
}
/deep/.el-input__inner {
  border: none;
}
.righttuijian {
  padding: 10px 0;
  font-size: 12px;
  color: #666;
  a{
    color: #666;
    margin: 0 5px;
  }
}
.strategy{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
 p{
   font-weight: 400;
    font-size: 18px;
    color: orange;
 }
}
</style>