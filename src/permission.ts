
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission';

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()
  // Determine whether the user has logged in
  if (UserModule.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check whether the user has obtained his permission roles
      if (UserModule.roles.length < 1) {
        try {
          // Get user info, including roles
          let { data } = await UserModule.GetUserInfo()
          /* 注释获取动态路由，实际开发中请打开
          const path = data.menus
          const firstPath = path[0].redirect ? path[0].redirect : path[0].path // 获取动态路由的第一个 path
          */
          const path: any[] = [] // 组件展示，实际开发中注释
          await PermissionModule.GenerateRoutes({ path })
          router.addRoutes(PermissionModule.addRouters)
          if (to.path === '' || to.path === '/') {
            // next({ path: firstPath, replace: true }) // 注释动态路由跳转，实际开发中请打开
            next({ path: 'components', replace: true }) // 组件展示，实际开发中注释
          } else {
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          }
          next()
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken()
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
          // location.href = `/portal/#/login` // 统一跳转到portal登录
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      // location.href = `/portal/#/login` // 统一跳转到portal登录
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  document.title = to.meta.title
})
