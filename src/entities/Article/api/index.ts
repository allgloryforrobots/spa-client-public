import {AxiosResponse} from 'axios'
import {$api} from 'shared/http'
import {IArticle} from 'entities/Article/types'
import {ArticleDTO} from '../dto'

const API_ARTICLE = '/api/articles'

export class ApiArticle {

    static async create(article: ArticleDTO): Promise<AxiosResponse<IArticle>> {
        return await $api.post<IArticle>(API_ARTICLE, article)
    }

    static async getMany(theme: string): Promise<AxiosResponse<IArticle[]>> {
        return await $api.get(API_ARTICLE + `?theme=${theme}`)
    }

    static async getByUser(id: number): Promise<AxiosResponse<IArticle[]>> {
        return await $api.get(API_ARTICLE + `?id=${id}`)
    }

    static async get(id: number): Promise<AxiosResponse<IArticle>> {
        return await $api.get(API_ARTICLE + `/${id}`)
    }

    static async delete(id: number): Promise<AxiosResponse<string>> {
        return await $api.delete(API_ARTICLE + `/${id}`)
    }

    static async update(id: number, article: ArticleDTO): Promise<AxiosResponse<IArticle>>  {
        return await $api.put(API_ARTICLE + `/${id}`)
    }

}