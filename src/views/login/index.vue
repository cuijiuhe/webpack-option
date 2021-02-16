<template>
  <div class="login-container">
    <transition-group class="login-bg" name="flip-list" tag="ul">
      <li v-for="bg in loginBgs" :key="bg" class="list-item">
        <img :src="bg">
      </li>
    </transition-group>
    <div class="login-cover"/>
    <div class="login-body">
      <div class="login-content">
        <h1 class="login-logo"/>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="top"
          class="login-form"
        >
          <el-form-item label="用户名" prop="loginname">
            <el-input
              ref="loginname"
              v-model="loginForm.loginname"
              placeholder="请输入用户名"
              name="loginname"
              type="text"
              class="login-input"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              ref="password"
              :type="passwordType"
              v-model="loginForm.password"
              placeholder="请输入密码"
              name="password"
              class="login-input"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
            </span>
          </el-form-item>
          <el-form-item class="el-form-checkbox">
            <el-checkbox
              v-model="isChecked"
              class="login-checkbox"
            >记住用户名</el-checkbox>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <p class="copyright">Copyright &copy; 北汽福田汽车股份有限公司 版权所有</p>
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

declare function require(string: any): string;

const loginBg1 = require('@/assets/bg_01.png');
// const loginBg2 = require('@/assets/bg_02.png');
const loginBg3 = require('@/assets/bg_03.png');
const loginBg4 = require('@/assets/bg_04.png');
const loginBg5 = require('@/assets/bg_05.png');
const loginBg6 = require('@/assets/bg_06.png');

@Component({
  name: "Login",
})
export default class extends Vue {
  private loginBgs:any[] = []
  private loginBg:any[] = [
    loginBg1,
    // loginBg2,
    loginBg3,
    loginBg4,
    loginBg5,
    loginBg6
  ]
  private index:number = 0;
  private isChecked = true;
  private loginForm = {
    loginname: "",
    password: ""
  };
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length === 0) {
      callback(new Error('请输入用户名'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length === 0) {
      callback(new Error("请输入密码"));
    } else {
      callback();
    }
  };
  private loginRules = {
    loginname: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
  };
  private passwordType = 'password';
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
    // 自动切换背景图片
    this.loginBgs = [this.loginBg[0]]
    this.startChange()

    if (this.loginForm.loginname === "") {
      (this.$refs.loginname as Input).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as Input).focus();
    }
  }
  // 展示密码
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
  // 登录处理
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
  // 获取链接参数字符串
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
  // 自动切换背景图片
  private startChange() {
    setInterval(() => {
      if (this.index < this.loginBg.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
      this.loginBgs.splice(0, 1, this.loginBg[this.index])
    }, 10000)
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#fff;
  $light_gray:#333;
  $cursor: #333;
  $error: #ff3030;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  } 
  /* reset element-ui css */
  .login-container {
    .el-form-item {
      margin-bottom: 22px;
    }
    .el-form-item__label {
      display: block;
      height: auto !important;
      background-color: transparent;
      border-right: 0;
      color: $cursor;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      padding-bottom: 10px;
    }
    .el-form-item__error {
      left: 12px;
      color: $error;
      font-size: 14px;
      line-height: 22px;
      padding-top: 2px;
    }
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      display: none;
    }
    .el-form-checkbox {
      margin-top: -6px;
      margin-bottom: 6px;
    }
    .login-input {
      display: inline-block;
      background-color: $bg;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 4px 16px;
        color: $light_gray;
        height: 40px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .login-button {
      width: 100%;
      height: 40px;
      background: linear-gradient(-90deg, #740780 0%, #005ee1 0%, #008cef 100%);
      border-radius: 0;
      border: 0 none;
      font-size: 14px;
      line-height: 40px;
      padding: 0 20px;
    }
    .el-checkbox,
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #333;
    }
  }
  @media (max-width: 1440px) and (min-width: 1200px) {
    .login-container {
      .el-form .el-form-item .el-form-item__label,
      .el-form .el-form-item .el-input {
        width: 100% !important;
      }
    }
  }
</style>
<style lang="scss" scoped>
$dark_gray:#889aa4;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  min-width: 600px;
  min-height: 680px;
  overflow: hidden;
  .show-pwd {
    position: absolute;
    right: 16px;
    top: 50%;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    margin-top: -20px;
  }
  .flip-list-enter-active, .flip-list-leave-active {
    transition: all 3s;
  }
  .flip-list-enter, .flip-list-leave-active {
      opacity: 0;
  }
  .login-bg li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .login-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .login-cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.001);
  }
  .login-body {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .login-content {
    position: absolute;
    top: 50%;
    right: 16%;
    z-index: 101;
    box-sizing: border-box;
    width: 366px;
    height: 392px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    padding: 40px;
    margin-top: -220px;
  }
  .login-logo {
    display: block;
    width: 104px;
    height: 36px;
    background: url("../../assets/logo_foton.png") no-repeat 0 0;
    background-size: cover;
    margin: 0 0 20px 0;
  }
  .login-footer {
    position: fixed;
    bottom: 20px;
    right: 0;
    left: 0;
    padding: 8px 0;
    .copyright {
      color: #fff;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      margin: 0;
      padding: 0 16px;
    }
  }
}
</style>