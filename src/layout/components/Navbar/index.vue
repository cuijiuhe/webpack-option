<template>
	<div class="navbar">
		<div class="logo-box">
			<img class="logo" src="@/assets/logo.png" alt />
			<hamburger
				id="hamburger-container"
				:is-active="sidebar.opened"
				class="hamburger-container"
				@toggleClick="toggleSideBar"
			/>
		</div>

		<div class="right-menu">
      <!-- <div class="right-menu-item home-info" @click="backPortal">
        <svg-icon class="home-icon" name="home" width="18" height="18" />
        <span class="home-text">回到控制台</span>
      </div> -->
      <el-dropdown
        class="right-menu-item hover-effect"
        trigger="click"
      >
        <div class="user-info">
          <span class="user-name">你好，{{ name }}<i class="el-icon-caret-bottom"></i></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="logout"
          >退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import Hamburger from '@/components/Hamburger/index.vue'

@Component({
	name: 'Navbar',
	components: {
		Hamburger
	}
})
export default class extends Vue {
	get sidebar() {
		return AppModule.sidebar
	}

	get device() {
		return AppModule.device.toString()
	}

	get avatar() {
		return UserModule.avatar
	}

	get name() {
		return UserModule.name
	}

	private toggleSideBar() {
		AppModule.ToggleSideBar(false)
	}

	private async logout() {
    await UserModule.LogOut()
		this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // location.href = `/portal/#/login` // 统一跳转到portal登录
  }

	private backPortal() {
		location.href = '/portal/'
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 60px;
	overflow: hidden;
	position: relative;
	background: #409eff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 20px;

	.logo-box{
		display: flex;
		align-items: center;
		.logo{
			display: block;
			width: 120px;
			height: 40px;
			margin-right: 70px;
		}
	}

	.hamburger-container {
    display: none;
		line-height: 60px;
		height: 100%;
		// float: left;
		padding: 0 15px;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;
		color: #fff;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.right-menu {
		float: right;
		height: 100%;
		// min-width: 150px;
		margin-right: 20px;
		color: #fff;
		.rigitMenu-left {
			float: left;
			margin-top: 10px;
			img {
				display: block;
				width: 42px;
			}
		}
		.rigitMenu-right {
			float: left;
			margin-left: 20px;
		}
    .home-info {
      float:left;
      position: relative;
      height: 60px;
      line-height: 60px;
      vertical-align: middle;
      padding-right: 16px;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 16px;
        background-color: #fff;
        margin-top: -8px;
      }
    }
    .home-icon {
      display: inline-block;
      margin-right: 8px;
      vertical-align: -4px;
    }
    .home-text {
      color: #fff;
      font-size: 14px;
    }
    .user-info {
      color: #fff;
      font-size: 14px;
      line-height: 60px;
      cursor: pointer;
      .el-icon-caret-bottom {
        margin-left: 8px;
      }
    }
		.name {
			font-size: 13px;
			line-height: 24px;
			margin-bottom: 0;
			margin-top: 8px;
			font-weight: 400;
		}
		.position {
			margin: 0;
			margin-bottom: 7px;
			overflow: hidden;
			.positionSpan {
				text-decoration: underline;
			}
		}
		.bottom_box div {
			float: left;
			margin: 0;
			margin-right: 10px;
			font-size: 17px;
			cursor: pointer;
			span {
				color: #fff;
			}
		}
		.bottom_box div:first-child {
			padding-top: 1px;
			margin-right: 5px;
		}
		&:focus {
			outline: none;
		}
		.right-menu-item {
			display: inline-block;
			margin-left: 16px;
		}
		.screenfull {
			height: 15px;
			color: #fff;
		}
		.international {
			vertical-align: top;
		}
		.theme-switch {
			vertical-align: 15px;
		}
		.avatar-container {
			height: 50px;
			margin-right: 30px;
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;
				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
