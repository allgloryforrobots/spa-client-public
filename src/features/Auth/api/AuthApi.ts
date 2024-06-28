import {AxiosResponse} from 'axios'
import {$defaultApi} from 'shared/http'
import {API_AUTH_LOGIN, API_AUTH_REGISTRATION, API_AUTH_LOGOUT, API_AUTH_REFRESH} from './routes'
import {IAuthResponse} from 'features/Auth/types'

export class AuthApi {

    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return await $defaultApi.post<IAuthResponse>(API_AUTH_LOGIN, {email, password})
    }

    static async logout(): Promise<void> {
        await $defaultApi.post(API_AUTH_LOGOUT)
    }

    static async registration(email: string, password: string, userName: string): Promise<AxiosResponse<IAuthResponse>> {
        return  await $defaultApi.post<IAuthResponse>(
            API_AUTH_REGISTRATION,
            {email, password, role: 'ADMIN', userName}
        )
    }

    static async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
        return await $defaultApi.get(API_AUTH_REFRESH)
    }

}