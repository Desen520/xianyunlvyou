<template>
  <div class="loginRegister">
    <el-form :model="from" :rules="rules" ref="from" class="from">
      <el-form-item class="from-item" prop="username">
        <el-input placeholder="用户名或手机号" v-model="from.username"></el-input>
      </el-form-item>
      <el-form-item class="from-item" prop="verification">
        <el-input placeholder="验证码" v-model="from.verification">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="from-item" prop="yousname">
        <el-input placeholder="你的名字" v-model="from.yousname"></el-input>
      </el-form-item>
      <el-form-item class="from-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="from.password"></el-input>
      </el-form-item>
      <el-form-item class="from-item" prop="affirmpassword">
        <el-input placeholder="确认密码" type="password" v-model="from.affirmpassword"></el-input>
      </el-form-item>
      <el-button type="primary" class="register" @click="handleLoginregister">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.from.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      from: {
        username: "",
        yousname: "",
        password: "",
        affirmpassword: "",
        verification: ""
      },
      rules: {
        yousname: [
          {
            required: true,
            message: "请输入你的名字",
            trigger: "blur"
          }
        ],
        verification: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
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
        ],
        affirmpassword: [
          {
            validator: validatePass2,

            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
      //   console.log(123)
      // 判断是否为空
      if (!this.from.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 判断是否为正确格式
      if (/^1[3456789]\d{9}$/.test(this.from.username) === false) {
        this.$confirm("手机号码格式不正确", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.from.username
        }
      }).then(res => {
        // console.log(res)
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "success"
        });
      });
    },

    handleLoginregister() {
      this.$refs["from"].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: {
              username: this.from.username,
              nickname: this.from.yousname,
              captcha: this.from.verification,
              password: this.from.password
            }
          }).then(res => {
            this.$message({
              message: "恭喜你,注册成功",
              type: "success"
            });
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

.register {
  width: 100%;
  margin-top: 10px;
}
</style>