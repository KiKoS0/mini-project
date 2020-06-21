import request from '@/utils/request'

export const getNews = (pagination: number) =>
    request({
        url: '/news',
        method: 'get',
        params: { page: pagination }
    })
