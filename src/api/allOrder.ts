import request from '@/utils/request'
import qs from 'qs';

// 订单列表查询
export const getOrderList = (data: any) =>
  request({
    url: '/order/getOrdersList',
    method: 'post',
    data: data
  })

// 订单列表统计查询导出 
export const exportOrdersList = `${process.env.VUE_APP_BASE_API}/order/exportOrdersListStatistics`
  

// 统计查询导出
export const exportStatisticsQuery = `${process.env.VUE_APP_BASE_API}/order/exportStatisticsQuery`

// 业务审批通过或驳回
export const orderBusApprove = (data: any) =>
  request({
    url: '/order/orderBusApprove',
    method: 'post',
    data: data
  })

// 转账成功或驳回
export const orderFinanceApprove = (data: any) =>
  request({
    url: '/order/orderFinanceApprove',
    method: 'post',
    data: data
  })

// 统计查询
export const statisticsQuery = (data: any) =>
  request({
    url: '/order/statisticsQuery',
    method: 'post',
    data: data
  })
  
//   // 统计下拉框查询
// export const promoteProductsSelect = () =>
// request({
//   url: '/product/getProductDictionary',
//   method: 'get',
// })
  // 推广产品统计下拉字典查询
export const getProductDictionary = () =>
request({
  url: '/order/getProductDictionary',
  method: 'get',
})

// 推广渠道统计下拉字典查询
export const getProductChannel = () =>
request({
  url: '/order/getProductChannel',
  method: 'get'
})
