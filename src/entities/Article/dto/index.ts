import {OutputData} from '@editorjs/editorjs'
import {IArticle} from '../types'

export class ArticleDTO  {
    content: OutputData
    title: string
    published: boolean
    id: number | null

    constructor(model: IArticle) {
        this.content = model.content
        this.title = model.title
        this.published = model.published
        this.id = model.id
    }
}