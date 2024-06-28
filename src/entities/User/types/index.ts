import {UserRoleEnum} from 'shared/types'

export interface IUser {
    email: string
    id: string
    isActivated: boolean
    role: UserRoleEnum
}