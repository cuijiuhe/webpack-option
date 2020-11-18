import request from '@/utils/request'

// 导出报表路径
export const exportRafficData = `${process.env.VUE_APP_BASE_API}/etcProducer/common/download`

// 获取字典项
export const getDictionaryList = (data: any) =>
  request({
    url: '/dictionary/getDictionaryList',
    method: 'post',
    data
  })