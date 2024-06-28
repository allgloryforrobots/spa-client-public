import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IUser} from 'entities/User'
import {AuthApi} from 'features/Auth'
import {IAuthResponse} from 'features/Auth/types'
import {createToast} from 'features/GlobalToast'
import {LoadingStatusEnum} from 'shared/types'
import {COOKIE_TOKEN, HOME_PAGE_PATH, LOGIN_PAGE_PATH} from 'shared/constants'
import extractErrorText from 'shared/utils/excractError'
import historyClass from 'shared/utils/history'
import {RootState} from 'app/store'

export interface AuthState {
    status: LoadingStatusEnum
    user: IUser | null
}

const initialState: AuthState = {
    user: null,
    // для корректного перехода на /article/edit/1 под авторизованным пользователем
    // роуты защищенные, см. app/router
    status: LoadingStatusEnum.LOADING
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null
            localStorage.removeItem(COOKIE_TOKEN)
        },
        setUser: (state, action: PayloadAction<IAuthResponse>) => {
            state.status = LoadingStatusEnum.SUCCESS
            state.user = action.payload.user
            state.user = action.payload.user
            localStorage.setItem(COOKIE_TOKEN, action.payload.accessToken)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                if (state.status === LoadingStatusEnum.LOADING) {
                    throw new Error('Запрос уже отправлен')
                }
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                authSlice.caseReducers.setUser(state, action)
                state.status = LoadingStatusEnum.SUCCESS
                historyClass.go(HOME_PAGE_PATH)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = LoadingStatusEnum.ERROR
                createToast(action.error.message)
            })
            .addCase(register.pending, (state) => {
                if (state.status === LoadingStatusEnum.LOADING) {
                    throw new Error('Запрос уже отправлен')
                }
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                authSlice.caseReducers.setUser(state, action)
                state.status = LoadingStatusEnum.SUCCESS
                historyClass.go(HOME_PAGE_PATH)
            })
            .addCase(register.rejected, (state, action) => {
                authSlice.caseReducers.clearUser(state)
                createToast(action.error.message)
                state.status = LoadingStatusEnum.ERROR
            })
            .addCase(logout.pending, (state) => {
                if (state.status === LoadingStatusEnum.LOADING) {
                    throw new Error('Запрос уже отправлен')
                }
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(logout.fulfilled, (state) => {
                authSlice.caseReducers.clearUser(state)
                state.status = LoadingStatusEnum.SUCCESS
                historyClass.go(LOGIN_PAGE_PATH)
            })
            .addCase(logout.rejected, (state, action) => {
                createToast(action.error.message)
                state.status = LoadingStatusEnum.ERROR
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.status = LoadingStatusEnum.LOADING
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                authSlice.caseReducers.setUser(state, action)
                state.status = LoadingStatusEnum.SUCCESS
            })
            .addCase(checkAuth.rejected, (state, action) => {
                // ! если токен не валиден, придет ошибка, но c точки зрения бизнес-логики, это успешное завершение операции
                authSlice.caseReducers.clearUser(state)
                state.status = LoadingStatusEnum.SUCCESS
            })
    }
})

export const { reducer: authReducer, actions: authActions } = authSlice

export const login =
    // createAsyncThunk<
    //     IAuthResponse,
    //     {email: string, password: string},
    //     {rejectValue: string, state: AuthState}
    // >(
    createAsyncThunk(
    'auth/login',
    // {rejectWithValue, getState, dispatch}

    async (args: {email: string, password: string}): Promise<IAuthResponse> => {
        try {
            const {email, password} = args
            const {data} = await AuthApi.login(email, password)
            return data
        } catch(error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }

})

export const register = createAsyncThunk(
    'auth/register',
    async (args: {userName: string, password: string, email: string}, {getState}): Promise<IAuthResponse> => {
        try {
            const state = getState() as RootState
            if (state.auth.status === LoadingStatusEnum.LOADING) {
                throw new Error('Запрос уже отправлен')
            }
            const {userName, password, email} = args
            const {data} = await AuthApi.registration(email, password, userName)
            return data
        } catch (error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (): Promise<void> => {
        try {
            await AuthApi.logout()
        } catch (error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (): Promise<IAuthResponse> => {
        try {
            const {data} = await AuthApi.checkAuth()
            return data
        } catch(error) {
            const errorText = extractErrorText(error)
            throw new Error(errorText)
        }
    }
)


