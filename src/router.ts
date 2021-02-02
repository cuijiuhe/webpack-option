import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export const constantRouterMap: any[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: '用户登录',
      hidden: true
    }
  },
  {
    path: '/404',
    redirect: '/components/404',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/components/table',
    meta: {
      title: '首页',
      hidden: true
    }
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/table',
    meta: {
      title: '功能页面',
      icon: 'nested'
    },
    children: [
      {
        path: 'table',
        component: () => import(/* webpackChunkName: "table" */ '@/views/components/table/index.vue'),
        meta: {
          title: '表格',
          icon: 'jewelry'
        }
      },
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/components/form/index.vue'),
        meta: {
          title: '表单',
          icon: 'order'
        }
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '@/views/components/detail/index.vue'),
        meta: {
          title: '详情',
          icon: 'tradingvolume'
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
        meta: {
          title: '404',
          icon: 'tradingvolume',
          hidden: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '404',
      hidden: true
    }
  }
]

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
