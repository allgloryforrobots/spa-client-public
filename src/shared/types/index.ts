export type ErrorResType = {
    message: string
}

export type OkResType = {
    message: 'ok'
}

export type OkOrErrorResType = ErrorResType | OkResType

export enum LoadingStatusEnum {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
    RELOADING = 'RELOADING'
}

export enum UserRoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN'
}
