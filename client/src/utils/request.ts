import axios from 'axios'

import { UserModule } from '@/store/modules/user'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000
})

service.interceptors.request.use(
    (config) => {
        // Add Authorization header to every request, you can add other custom headers here
        if (UserModule.token) {
            config.headers['Authorization'] = `Bearer ${UserModule.token}`
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)


// Response interceptors
service.interceptors.response.use(
    (response) => response,
    (error) => {
        // Some example codes here:
        // code == 6001: username or password is incorrect
        const res = error.response?.data
        if (res && res.failureCode) {
            // Custom api error code
            if (res.failureCode === 6001) {
                console.log("USERNAME INVALID")
            }
        }
        return Promise.reject(error)
    }
)

export default service