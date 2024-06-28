import axios, {AxiosInstance} from 'axios'
import {AuthApi} from 'features/Auth'
import {LOGIN_PAGE_PATH} from 'shared/constants'
import historyClass from 'shared/utils/history'

const $defaultApi = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

const $api: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

// @ts-ignore
const authInterceptor = (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$api.interceptors.request.use(authInterceptor)

$api.interceptors.response.use(
    (config) => config,

    async (error) => {
        try {
            // повторяем запрос после перевыпуска токенов
            const originalRequest = error.config

            if (error.response.status === 401 && error.config && !originalRequest._isRetry) {

                originalRequest._isRetry = true
                await AuthApi.checkAuth()
                return await $api.request(originalRequest)
            }
        } catch(e) {
            console.log('Не авторизован')
        }
        historyClass.go(LOGIN_PAGE_PATH)
    }
)

export {
    $api,
    $defaultApi
} 