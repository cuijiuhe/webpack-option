import { constantRouterMap } from '@/router'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import Layout from '@/layout/index.vue'
const _import = require('@/utils/_import_' + process.env.NODE_ENV)
import store from '@/store'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes: any) {
  
  const accessedRouters = routes.filter((route: any) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

export interface IPermissionState {
  routers: any[],
  addRouters: any[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routers = constantRouterMap
  public addRouters = []

  @Mutation
  private SET_ADDROUTERS(routers: any) {
    this.addRouters = routers.concat(constantRouterMap)
  }

  @Mutation
  private SET_ROUTERS(routers: any) {
    this.routers = routers
  }

  @Action
  GenerateRoutes(data: any) {
    return new Promise(resolve => {
      const { path } = data
      var accessedRouters
      accessedRouters = filterAsyncRouter(path)
      this.SET_ADDROUTERS(accessedRouters)
      this.SET_ROUTERS(accessedRouters)
      resolve()
    })
  } 
}

export const PermissionModule = getModule(Permission)
