import request from '@/utils/request'

export const login = (data: any) =>
    request({
        url: '/users/login',
        method: 'post',
        data
    })

export const register = (data: any) =>
    request({
        url: '/users',
        method: 'post',
        data
    })

export const logout = () =>
    request({
        url: '/users/logout',
        method: 'post'
    })

export const getUserInfo = () =>
    request({
        url: '/users/info',
        method: 'GET'
    })