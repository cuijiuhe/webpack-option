import request from '@/utils/request'
import qs from 'qs';

// 获取推广产品列表
export const getProductList = (data: any) =>
  request({
    url: '/product/getProductList',
    method: 'post',
    data: data
  })


// 查询某个推广产品详情
export const getDetailByProductList = (id: string) =>
  request({
    url: '/product/getProduct/' + id,
    method: 'get'
  })

// 添加推广产品
export const addProduct = (data: any) =>
  request({
    url: '/product/saveProduct',
    method: 'post',
    data: data
  })

// 更改推广产品状态
// { productId, status }: { productId: any, status: any }
export const changeProductStatus = (productId: any, status: any) =>
  request({
    url: `/product/changeStatus/${productId}/${status}`,
    method: 'put'
  })

// 删除推广产品
export const deleteProduct = (productId: string) =>
  request({
    url: `/product/deleteProduct/${productId}`,
    method: 'get'
  })
