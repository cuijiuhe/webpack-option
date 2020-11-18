import request from '@/utils/request'
import qs from 'qs';

// 获取订单列表数据
export const getOrderData = (data: any) =>
  request({
    url: '/etcProducer/ectOrderInfo/orderInfoList',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

export const getOrderNumInfo = () =>
  request({
    url: '/etcProducer/ectOrderInfo/orderNumInfo',
    method: 'get'
  })

// 获取客户详情信息
export const getClientDetail = (data:any) =>
  request({
    url: '/etcProducer/etcClient/clientDetail',
    method: 'get',
    params: data
  })

// 查询邮寄信息
export const getMailMessage = (data:any) =>
  request({
    url: '/etcProducer/etcConsifnee/selectMailMessage',
    method: 'get',
    params: data
  })

// 查询自提点信息
export const getTakeTheirMessage = (data:any) =>
  request({
    url: '/etcProducer/etcConsifnee/selectTakeTheirMessage',
    method: 'get',
    params: data
  })

// 获取车辆详情信息
export const getVehicleDetail = (data:any) =>
  request({
    url: '/etcProducer/etcVehicle/vehicleDetail',
    method: 'get',
    params: data
  })

// 获取推广详情信息
export const getSpreaderDetail = (data:any) =>
  request({
    url: '/etcProducer/etcSpreader/spreaderDetail',
    method: 'get',
    params: data
  })

// 更新订单信息
export const updateEtcOrderInfo = (data :any) =>
  request({
    url: '/etcProducer/ectOrderInfo/updateEtcOrderInfo',
    method: 'post',
    data: data
  })


// 获取导出文件
export const getexportRafficData = (params: any) =>
  request({
    url: '/etcProducer/ectOrderInfo/export',
    method: 'get',
    params
  })

  