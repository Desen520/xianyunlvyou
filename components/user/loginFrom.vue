<template>
  <div class="loginFrom">
    <el-form :model="from" :rules="rules" ref="from" class="from">
      <el-form-item class="from-item" prop="username">
        <el-input placeholder="用户名或手机号" v-model="from.username"></el-input>
      </el-form-item>
      <el-form-item class="from-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="from.password"></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>
      <el-button type="primary" class="submit" @click="handleLoginsubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLoginsubmit() {
      this.$refs["from"].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.from
          }).then(res => {
            console.log(res.data);
            this.$router.back();
            this.$store.commit("user/setUser", res.data);
            this.$message({
              message: "登录成功",
              type: "success"
            })
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.from {
  padding: 25px;
}

.from-item {
  margin-bottom: 20px;
}

.from-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>