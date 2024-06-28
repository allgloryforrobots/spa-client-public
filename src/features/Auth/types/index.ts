import {IUser} from 'entities/User/types'

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}