
<template>
  <el-row class="login">
    <div class="box">
      <img src="../image/login/logo.png" alt />
      <span class="system-name">TY后台管理系统</span>
      <div class="form-container">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <el-form ref="form">
            <ty-input
              v-model="form.loginName"
              rules="required"
              vid="loginName"
              placeholder="请输入用户名称"
              label="用户名称"
              hideLabel
              height="56px"
            />
            <ty-input
              v-model="form.password"
              rules="required"
              vid="password"
              type="password"
              label="登录密码"
              placeholder="请输入登录密码"
              hideLabel
            />
          </el-form>
          <!-- <el-button @click="reset">重 置</el-button> -->
          <el-button type="primary" @click="passes(doLogin)" class="loginBtn">登 录</el-button>
        </ValidationObserver>
      </div>
    </div>
    {{userInfo}}
  </el-row>
</template>

<script>
import { TyInput } from "ty-component";
import { ValidationObserver } from "vee-validate";
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  created() {},
  components: {
    ValidationObserver,
    TyInput
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  data() {
    return {
      form: {
        loginName: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    doLogin() {
      this.login(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0 auto;
  background-image: url(../image/login/bg.png);
  width: 100%;

  .box {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center; //水平居中
    align-items: center; //垂直居中
    flex-direction: column; //从上到下
    height: 100%;
  }
  .system-name {
    font-family: AlibabaPuHuiTi-Medium;
    font-size: 40px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 56px;
    margin: 16px 0 40px;
  }
  .form-container {
    width: 560px;
    padding: 40px 80px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 16px;
    border-radius: 16px;
  }
  .logo {
    // display: block;
  }
  /deep/.el-input--small .el-input__inner {
    height: 56px;
    font-family: AlibabaPuHuiTi-Regular;
    font-size: 20px;
    color: #afbaca;
    letter-spacing: 0;
    line-height: 28px;
  }
  .loginBtn {
    height: 56px;
    width: 100%;
    font-family: AlibabaPuHuiTi-Medium;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0;
  }
  /deep/.el-form-item--mini.el-form-item,
  /deep/.el-form-item--small.el-form-item {
    margin-bottom: 32px;
  }
}
</style>
