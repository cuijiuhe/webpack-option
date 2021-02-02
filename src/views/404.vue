<template>
  <div class="mod-page">
    <el-card class="mod-card mod-status">
      <div class="mod-product">
        <div class="mod-product-image">
          <img src="@/assets/404.png" alt="" />
        </div>
        <div class="mod-product-desc">{{ message }}</div>
        <div class="mod-product-opt">
          <el-button type="primary" size="small" @click.native="goHome">返回首页</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Page404'
})
export default class extends Vue {
  private message = '啊呀！你访问的页面不小心迷路了～'

  private goHome() {
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.mod-page {
  justify-content: center;
}
.mod-status {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mod-product {
  &-image {
    width: 500px;
    height: 300px;
  }
  &-desc {
    color: $textColorSecondary;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    margin-top: $gapNormal;
  }
  &-opt {
    text-align: center;
    margin: $gapNormal 0;
  }
}
</style>
