import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const bookSearch = (name: string): AxiosPromise<any> =>
    request({
        url: '/books/search',
        method: 'GET',
        params: {
            name
        }
    })

export const bookCreate = (id: string, provider: string): AxiosPromise<any> =>
    request({
        url: '/books',
        method: 'POST',
        data: {
            id, provider
        }

    })

export const bookAddLibrary = (bookId: number, userId: string, state: number): AxiosPromise<any> =>
    request({
        url: '/library',
        method: 'POST',
        data: {
            bookId, userId, state
        }
    })

export const libraryGet = (): AxiosPromise<any> =>
    request({
        url: '/library',
        method: 'GET',
        params: {
        }
    })


export const bookChangeState = (bookId: number, state: number): AxiosPromise<any> =>
    request({
        url: '/library',
        method: 'PUT',
        data: {
            bookId, state
        }

    })