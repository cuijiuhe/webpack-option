import request from '@/utils/request'
import qs from 'qs';


// 获取通行数据接口
export const getRafficData = (data: any) =>
  request({
    url: '/etcProducer/etcPassage/passageList',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

// 获取导出文件
export const getexportRafficData = (params: any) =>
  request({
    url: '/etcProducer/etcPassage/export',
    method: 'get',
    params
  })

//推广/激活数信息
export const getAnalyzeNumInfo = () =>
  request({
    url: '/etcProducer/ectDataAnalysis/analyzeNumInfo',
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

// 收入情况
export const getIncomeInfo = (data: any) =>
  request({
    url: '/etcProducer/ectDataAnalysis/incomeInfo?' + qs.stringify(data),
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })



// 提现情况
export const getWithdrawInfo = () =>
  request({
    url: '/etcProducer/ectDataAnalysis/withdrawInfo',
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

// 门店推广分布 
export const findShopGeneralize = () =>
  request({
    url: '/etcProducer/ectDataAnalysis/findShopGeneralize',
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

// 收入情况报表导出
export const getIncomeInfoExport = (data: any = {}) =>
  request({
    url: '/etcProducer/ectDataAnalysis/incomeInfoExport?' + qs.stringify(data),
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })

// 提现情况报表导出
export const getWithdrawInfoExport = () =>
  request({
    url: '/etcProducer/ectDataAnalysis/withdrawInfoExport',
    method: 'get',
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    }
  })




