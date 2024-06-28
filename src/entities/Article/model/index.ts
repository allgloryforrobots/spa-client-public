import {LoadingStatusEnum} from 'shared/types'
import {OutputData} from '@editorjs/editorjs'
import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {IArticle} from 'entities/Article/types'
import extractErrorText from 'shared/utils/excractError'
import {ApiArticle} from '../api'
import {ArticleDTO} from '../dto'
import {RootState} from 'app/store'
import historyClass from 'shared/utils/history'
import {ARTICLE_PAGE_PATH} from 'shared/constants'

interface ArticleState {
    status: LoadingStatusEnum
    data: IArticle
}

const initialState: ArticleState = {
    status: LoadingStatusEnum.INIT,
    data: {
        content: {
            "time": new Date().getTime(),
            "blocks": [
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Кликните, чтобы начать редактировать статью",
                        "level": 1
                    }
                },
            ]
        },
        title: 'Новая статья',
        published: true,
        createdAt: null,
        authorId: null,
        id: null
    }

}

const articleSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setContent(state, action: PayloadAction<OutputData>) {
            state.data.content = action.payload
        },
        setTitle(state, action: PayloadAction<string>) {
            state.data.title = action.payload
        },
        setPublished(state, action: PayloadAction<boolean>) {
            state.data.published = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                submitArticle.pending, (state) => {
                if (state.status === LoadingStatusEnum.LOADING) {
                    throw new Error('Запрос уже отправлен')
                }
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(submitArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
                state.status = LoadingStatusEnum.SUCCESS
                state.data = action.payload
                historyClass.go(ARTICLE_PAGE_PATH + '/:id')
            })
            .addCase(submitArticle.rejected, (state) => {
                // на странице отобразиться алерт и кнопка перезагрузить
                state.status = LoadingStatusEnum.ERROR
            })
            .addCase(getArticle.pending, (state) => {
                if (state.status === LoadingStatusEnum.LOADING) {
                    throw new Error('Запрос уже отправлен')
                }
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(getArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
                state.status = LoadingStatusEnum.SUCCESS
                state.data = action.payload
            })
            .addCase(getArticle.rejected, (state) => {
                state.status = LoadingStatusEnum.ERROR
            })
    }
})

export const {reducer: articleReducer, actions: articleActions} = articleSlice

export const submitArticle = createAsyncThunk(
    'editor/submitArticle',
    async (_, {getState}): Promise<IArticle> =>  {
        try {
            const state = getState() as RootState
            const dto = new ArticleDTO(state.article.data)
            const {data} =  await ApiArticle.create(dto)
            return data

        } catch (error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }
    }
)

export const getArticle = createAsyncThunk(
    'editor/getArticle',
    async (id: number): Promise<IArticle> =>  {
        try {
            const {data} =  await ApiArticle.get(id)
            return data
        } catch (error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }
    }
)