<template>
  <div>
    <Header/>
    <nuxt />
    <Footer/>
    </div>
</template>
<script>
// 导入头部组件
import Header from "@/components/header"
import Footer from "@/components/footer"
export default {
  // 注册组件
  components: {
    Header,Footer
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
ol,li,ul{
  list-style: none;
}
a{
  text-decoration: none;
}
</style>
