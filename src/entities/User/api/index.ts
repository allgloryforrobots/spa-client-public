import {AxiosResponse} from 'axios'
import {IUser} from 'entities/User'
import {$api} from 'shared/http'

const API_GET_USERS = '/api/auth/users'

export class UserApi {

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(API_GET_USERS)
    }

}