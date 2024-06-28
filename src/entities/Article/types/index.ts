import {OutputData} from '@editorjs/editorjs'

export interface IArticle {
    content: OutputData
    title: string
    published: boolean
    createdAt: string | null
    authorId: number | null
    id: number | null
}