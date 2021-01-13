<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="true"
      :collapse-transition="true"
      :default-openeds="['1']"
    >
      <sidebar-item
        v-for="route in routes"
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
import variables from '@/styles/_variables.scss'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  mounted() {
  }
  get sidebar() {
    return AppModule.sidebar
  }

  get routes() {
    // 注释动态路由，实际开发中请打开
    // return PermissionModule.addRouters

    // 注释动态路由，实际开发中请打开
    return [
      {
        'redirect': '/components/table',
        'path': '/components',
        'children': [
          {
            'path': 'table',
            'meta': {
              'keepAlive': true,
              'noCache': false,
              'icon': 'jewelry',
              'fontSize': '20px',
              'marginBottom': '-4px',
              'title': '表格'
            }
          },
          {
            'path': 'form',
            'meta': {
              'keepAlive': true,
              'noCache': false,
              'icon': 'order',
              'fontSize': '20px',
              'marginBottom': '-4px',
              'title': '表单'
            }
          },
          {
            'path': 'detail',
            'meta': {
              'keepAlive': true,
              'noCache': false,
              'icon': 'tradingvolume',
              'fontSize': '20px',
              'marginBottom': '-4px',
              'title': '详情'
            }
          }
        ],
        'meta': {
          'icon': 'nested',
          'fontSize': '16px',
          'marginBottom': '-4px',
          'title': '功能页面'
        }
      }
    ] 
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
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
