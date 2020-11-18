import request from '@/utils/request'
import qs from 'qs';

export const getUserInfo = (data: any) =>
  request({
    url: '/basic/user/info',
    method: 'get',
    data: data
  })

export const login = (data: any) =>
  request({
    url: '/basic/user/login',
    method: 'post',
    data: data
  })

export const logout = (data: any) =>
  request({
    url: '/basic/user/logout',
    method: 'get',
    data: data
  })
