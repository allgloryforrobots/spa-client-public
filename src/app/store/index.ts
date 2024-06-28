import {authReducer} from 'features/Auth'
import {
    useDispatch,
    useSelector,
    useStore
} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {articleReducer} from 'entities/Article'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        article: articleReducer
    },
    devTools: true
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

