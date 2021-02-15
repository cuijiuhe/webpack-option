<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span class="menu-title" v-if="theOnlyOneChild.meta.title" slot="title">{{ theOnlyOneChild.meta.title }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <span class="menu-title" v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Route, RouteConfig } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return true;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    }
    return 0;
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (let child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: "" };
  }

  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>

<style lang="scss">
.el-submenu {
  &__title {
    height: $menuHeight;
    line-height: $menuHeight;
    padding: 0 $menuPaddingRight 0 $menuPaddingLeft !important;
    color: $menuText;
    font-size: $fontSizeNormal;
  }
  &__icon-arrow {
    right: $menuPaddingRight !important;
    color: $menuText !important;
    font-size: $fontSizeNormal !important;
  }
  .svg-icon {
    width: $menuIconSize !important;
    height: $menuIconSize !important;
    margin-right: $menuIconGap !important;
  }
  .el-menu-item {
    height: $menuHeight;
    line-height: $menuHeight;
    padding: 0 $subMenuPaddingRight 0 $subMenuPaddingLeft !important;
    .svg-icon {
      display: none;
    }
    .menu-title {
      display: flex;
      align-items: center;
      &::before {
        content: "";
        flex: none;
        width: 4px;
        height: 4px;
        background-color: $subMenuIconBg;
        margin-right: $subMenuIconGap;
      }
    }
    &.is-active {
      background-color: $subMenuActiveBg !important;
      border-right: 4px solid $subMenuIconActiveBg !important;
      .menu-title {
        &::before {
          background-color: $subMenuIconActiveBg !important;
        }
      }
    }
  }
  &.is-active {
    .el-submenu__title {
      color: $menuActiveText !important;
    }
  }
}

.submenu-title-noDropdown {
  height: $menuHeight;
  line-height: $menuHeight;
  padding: 0 $menuPaddingRight 0 $menuPaddingLeft !important;
  color: $menuText;
  font-size: $fontSizeNormal;
  .svg-icon {
    width: $menuIconSize !important;
    height: $menuIconSize !important;
    margin-right: $menuIconGap !important;
  }
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;
      .el-tooltip {
        padding: 0 !important;
      }
    }
    .el-submenu {
      overflow: hidden;
      & > .el-submenu__title {
        padding: 0 $menuPaddingRight 0 $menuPaddingLeftFold !important;
        .svg-icon {
          margin-right: 0 !important;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
        & > span {
          visibility: hidden;
        }
      }
    }
  }
  .el-menu-item {
    height: $menuHeight !important;
    line-height: $menuHeight !important;
    padding: 0 $gapLarge !important;
    transition: border-color .3s,background-color .3s,color .3s;
    .svg-icon {
      display: none;
    }
    .menu-title {
      display: flex;
      align-items: center;
      &::before {
        content: "";
        flex: none;
        width: 4px;
        height: 4px;
        background-color: $subMenuIconBg;
        margin-right: $subMenuIconGap;
      }
    }
    &.is-active {
      background-color: $subMenuActiveBg !important;
      .menu-title {
        &::before {
          background-color: $subMenuIconActiveBg !important;
        }
      }
    }
  }
  .submenu-title-noDropdown {
    text-align: center;
  }
  .submenu-title-noDropdown .svg-icon {
    display: inline-block;
    margin: 0;
  }
}
</style>
