<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<navbar class="navbar-container" />
		<sidebar class="sidebar-container" />
		<div class="main-container">
			<div class="breadcrumd">
				<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
			</div>
			<app-main />
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType, AppModule } from '@/store/modules/app'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/resize'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

@Component({
	name: 'Layout',
	components: {
		AppMain,
		Navbar,
		Sidebar,
		Breadcrumb
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
}
</script>

<style lang="scss" scoped>
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	background: #f2f6fc;
	overflow-y: scroll;
}

.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.main-container {
	min-height: calc(100% - 114px);
	transition: margin-left 0.28s;
	margin-left: $sideBarWidth;
	margin-top: 114px;
	position: relative;
	.breadcrumd {
		position: fixed;
		height: 54px;
		left: $sideBarWidth;
		top: 60px;
		background: #fff;
		width: 100%;
		z-index: 1001;
	}
}

.navbar-container {
	position: fixed;
	width: 100%;
	font-size: 0px;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
}

.sidebar-container {
	transition: width 0.28s;
	width: $sideBarWidth !important;
	height: calc(100% - 60px);
	position: fixed;
	font-size: 0px;
	top: 60px;
	bottom: 0;
	left: 0;
	z-index: 1001;
	overflow: hidden;
}

.hideSidebar {
	.main-container {
		margin-left: 54px;
	}

	.sidebar-container {
		width: 54px !important;
	}
	.breadcrumd {
		left: 54px;
	}
}

/* for mobile response 适配移动端 */
.mobile {
	.main-container {
		margin-left: 0px;
	}

	.sidebar-container {
		transition: transform 0.28s;
		width: $sideBarWidth !important;
	}

	&.openSidebar {
		position: fixed;
		top: 0;
	}

	&.hideSidebar {
		.sidebar-container {
			pointer-events: none;
			transition-duration: 0.3s;
			transform: translate3d(-$sideBarWidth, 0, 0);
		}
	}
}

.withoutAnimation {
	.main-container,
	.sidebar-container {
		transition: none;
	}
}
</style>
