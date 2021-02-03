<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<navbar class="navbar-container" />
		<sidebar class="sidebar-container" />
		<div class="main-container">
			<div class="breadcrumb-container">
				<breadcrumb class="breadcrumb" />
			</div>
			<app-main />
		</div>
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType, AppModule } from '@/store/modules/app'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/resize'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

@Component({
	name: 'Layout',
	components: {
		AppMain,
		Navbar,
		Sidebar,
    Breadcrumb,
    Hamburger
	}
})
export default class extends mixins(ResizeMixin) {
	get classObj() {
		return {
			hideSidebar: !this.sidebar.opened,
			openSidebar: this.sidebar.opened,
			withoutAnimation: this.sidebar.withoutAnimation,
			mobile: this.device === DeviceType.Mobile
		}
	}

	private handleClickOutside() {
		AppModule.CloseSideBar(false)
	}

	private toggleSideBar() {
		AppModule.ToggleSideBar(false)
	}
}
</script>

<style lang="scss" scoped>
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
  background-color: $backgroundColorPrimary;
	overflow: auto;
}
.drawer-bg {
	position: fixed;
	top: 0;
  left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background-color: $colorBlack;
	opacity: 0.3;
}
.main-container {
	position: relative;
	min-height: calc(100% - 60px - 48px);
	margin-left: $sideBarWidth;
	margin-top: calc(60px + 48px);
	transition: margin-left 0.28s;
}
.breadcrumb-container {
  position: fixed;
  left: $sideBarWidth;
  top: 60px;
  z-index: 1000;
  width: 100%;
  height: 48px;
  background-color: $backgroundColorPrimary;
  transition: left 0.28s;
}
.navbar-container {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1001;
	width: 100%;
}
.sidebar-container {
	position: fixed;
	top: 60px;
  bottom: 48px;
	left: 0;
	z-index: 1000;
	width: $sideBarWidth !important;
	height: calc(100% - 60px - 48px);
	overflow: hidden;
	transition: width 0.28s;
}
.hamburger-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
	width: $sideBarWidth !important;
  height: $breadcrumbHeight;
  background-color: $backgroundColorSecondary;
  border-right: 1px solid $sideBarBorderColor;
  line-height: $breadcrumbHeight;
  text-align: center;
  color: $textColorNormal;
  cursor: pointer;
  transition: width 0.28s;
}
.hideSidebar {
	.main-container {
		margin-left: $sideBarWidthFold;
	}
  .sidebar-container,
  .hamburger-container {
		width: $sideBarWidthFold !important;
  }
	.breadcrumb-container {
		left: $sideBarWidthFold;
	}
}
/* for mobile response 适配移动端 */
.mobile {
	.main-container {
		margin-left: 0;
	}
	.sidebar-container {
    width: $sideBarWidth !important;
    height: calc(100% - 60px);
  }
  .hamburger-container {
    top: 0;
    bottom: auto;
    z-index: 1001;
    left: 160px;
		width: $sideBarWidthFold !important;
    height: $navBarHeight;
    background-color: transparent;
    border-right: 0;
    color: #fff;
  }
	.breadcrumb-container {
		left: 0;
	}
	&.openSidebar {
		position: fixed;
		top: 0;
    .breadcrumb-container {
      left: $sideBarWidth;
    }
	}
	&.hideSidebar {
		.sidebar-container {
			pointer-events: none;
			transition-duration: 0.28s;
			transform: translate3d(-$sideBarWidth, 0, 0);
		}
	}
}
.withoutAnimation {
	.main-container,
  .sidebar-container,
  .breadcrumb-container  {
		transition: none;
	}
}
</style>
