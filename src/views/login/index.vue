<template>
  <div class="login">
    <div class="content">
      <div class="slogan"></div>
      <div class="login-container">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">{{title}}</h3>
          </div>
          <el-form-item prop="loginname">
            <span class="svg-container">
              <svg-icon name="user" />
            </span>
            <el-input
              class="login-input"
              ref="loginname"
              v-model="loginForm.loginname"
              name="loginname"
              type="text"
              autocomplete="on"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon name="password" />
            </span>
            <el-input
              class="login-input"
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
            </span>
          </el-form-item>

          <el-button
            class="login-button"
            :loading="loading"
            type="primary"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Dictionary } from "vue-router/types/router";
import { Form as ElForm, Input } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { isValidUsername } from "@/utils/validate";

@Component({
  name: "Login",
})
export default class extends Vue {
  private title = "用户登录";
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length === 0) {
      callback(new Error("请输入用户名"));
    } else {
      callback();
    }
  };
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length === 0) {
      callback(new Error("请输入密码"));
    } else {
      callback();
    }
  };
  private loginForm = {
    loginname: "",
    password: "",
  };
  private loginRules = {
    loginname: [{ validator: this.validateUsername, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
  };
  private passwordType = "password";
  private loading = false;
  private showDialog = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }

  mounted() {
    if (this.loginForm.loginname === "") {
      (this.$refs.loginname as Input).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as Input).focus();
    }
  }

  private showPwd() {
    if (this.passwordType === "password") {
      this.passwordType = "";
    } else {
      this.passwordType = "password";
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        try {
          await UserModule.Login(this.loginForm);
        } catch {
          this.loading = false;
        }

        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery,
        });
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false;
        }, 0.5 * 1000);
      } else {
        return false;
      }
    });
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
}
</script>

<style lang="scss">
.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 1000px;
  background: url("../../assets/login-img/bg_login.png") no-repeat left center;
  background-size: cover;
  .content {
    position: relative;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
  .slogan {
    position: absolute;
    top: 50%;
    left: 40px;
    width: 440px;
    height: 170px;
    background: url("../../assets/login-img/bg_login_title.png") no-repeat 0 0;
    background-size: 440px auto;
    transform: translate3d(0, -72px, 0);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    position: absolute;
    top: 50%;
    left: 10px;
    z-index: 10;
    color: #ccc;
    font-size: 16px;
    line-height: 28px;
    transform: translateY(-50%);
    user-select: none;
  }
  .title-container {
    position: relative;
    .title {
      color: #fff;
      font-size: 24px;
      line-height: 32px;
      margin: 16px auto 36px;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 10;
    color: $darkGray;
    font-size: 16px;
    line-height: 28px;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
  }
  .login-form {
    position: absolute;
    top: 50%;
    right: 40px;
    box-sizing: border-box;
    width: 360px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 40px;
    transform: translateY(-50%);
  }
  .login-title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    text-align: center;
    padding: 16px 0 36px;
  }
  .el-form-item {
    position: relative;
    margin-bottom: 20px;
  }
  .login-input .el-input__inner {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.5);
    color: #fff;
    font-size: 14px;
    padding-left: 36px;
    &:focus {
      border-color: rgba(255, 255, 255, 1);
    }
  }
  .login-checkbox {
    display: block;
    color: #fff;
    margin-bottom: 20px;
  }
  .login-button {
    display: block;
    width: 100%;
    font-size: 16px;
    padding-top: 11px;
    padding-bottom: 11px;
    margin-bottom: 20px;
  }
}
</style>