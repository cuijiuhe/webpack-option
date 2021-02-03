<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <sidebar-logo
      :collapse="isCollapse"
      :title="title"
    />
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="true"
      :default-openeds="['1']"
    >
      <sidebar-item
        v-for="(route, index) in routes"
        :index="index"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { PermissionModule } from '@/store/modules/permission'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/_variables.scss'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo
  }
})
export default class extends Vue {
  public title = '组件库'

  get sidebar() {
    return AppModule.sidebar
  }

  get routes() {
    return PermissionModule.addRouters
  }

  get variables() {
    return variables
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss">
.sidebar-container {
  background-color: $sideBarBg;
  border-right: 1px solid $sideBarBorderColor;
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .el-scrollbar {
    height: 100%
  }
  .scrollbar-wrapper {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
    overflow-x: hidden !important;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden;
    }
  }
  .el-scrollbar__view {
    display: flex;
    flex-direction: column;
    height: 100%
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }
    &.is-horizontal {
      display: none;
    }
  }
  .sidebar-logo-container {
    flex: none;
    margin-bottom: $gapLarge;
  }
  .el-menu {
    flex: auto;
    height: 100%;
    width: 100% !important;
    border: none;
  }
}
</style>
