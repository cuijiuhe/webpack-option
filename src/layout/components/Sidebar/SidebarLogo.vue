<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse': collapse}"
  >
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        class="sidebar-logo-link"
        to=""
      >
        <img src="@/assets/icon_app.png" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SidebarLogo'
})
export default class extends Vue {
  @Prop({ required: true }) private collapse!: boolean
  @Prop({ required: true }) private title!: string
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 0.28s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  height: $sideBarLogoHeight;
  background-color: $backgroundColorSecondary;
  overflow: hidden;
  .sidebar-logo-link {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    height: 100%;
    padding-left: $menuPaddingLeft;
    .sidebar-logo {
      flex: none;
      width: 16px;
      height: 16px;
    }
    .sidebar-title {
      flex: auto;
      color: $textColorNormal;
      font-size: $fontSizeLarge;
      font-weight: $fontWeightBold;
      white-space: nowrap;
      margin: 0 0 0 $gapMini;
      transition: opacity 0.28s;
    }
  }
  &.collapse {
    .sidebar-logo-link {
      padding-left: $menuPaddingLeftFold;
    }
    .sidebar-title {
      opacity: 0;
      width: 0;
    }
  }
}
</style>
