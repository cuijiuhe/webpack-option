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
  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  //   meta: { hidden: true }
  // },
  // {
  //   path: '/equitiesProductPromotion',
  //   component: Layout,
  //   redirect: '/equitiesProductPromotion/productpopularization',
  //   meta: {
  //     title: '权益产品推广',
  //     icon: 'nested',
  //     fontSize: '16px',
  //     marginBottom: '-4px'
  //   },
  //   children: [
  //     {
  //       path: 'productpopularization',
  //       component: () => import(/* webpackChunkName: "productpopularization" */ '@/views/equitiesProductPromotion/productpopularization/index.vue'),
  //       meta: {
  //         title: '推广产品',
  //         icon: 'jewelry',
  //         fontSize: '20px',
  //         marginBottom: '-4px'
  //       }
  //     },
  //     {
  //       path: 'allOrders',
  //       component: () => import(/* webpackChunkName: "allOrders" */ '@/views/equitiesProductPromotion/allOrders/index.vue'),
  //       meta: {
  //         title: '全部订单',
  //         icon: 'order',
  //         fontSize: '20px',
  //         marginBottom: '-4px'
  //       }
  //     },
  //     {
  //       path: 'dataAnalysis',
  //       component: () => import(/* webpackChunkName: "dataAnalysis" */ '@/views/equitiesProductPromotion/dataAnalysis/index.vue'),
  //       meta: {
  //         title: '数据分析',
  //         icon: 'tradingvolume',
  //         fontSize: '20px',
  //         marginBottom: '-4px'
  //       }
  //     },
  //   ]
  // },
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
