import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'
import {
    ACTIVATION_PAGE_PATH,
    ADMIN_PAGE_PATH,
    ARTICLE_EDIT_PAGE_PATH,
    ARTICLE_PAGE_PATH,
    ARTICLES_PAGE_PATH,
    CABINET_PAGE_PATH,
    CONSULTATION_PAGE_PATH,
    HOME_PAGE_PATH,
    LOGIN_PAGE_PATH, NOT_FOUND_PAGE,
    REGISTER_PAGE_PATH
} from 'shared/constants'
import historyClass from 'shared/utils/history'
import {AppDispatch, useAppDispatch, useAppSelector} from 'app/store'
import {IUser} from 'entities/User'
import {CabinetPage} from 'pages/Cabinet'
import {AdminPage} from 'pages/Admin'
import {ArticleEditPage} from 'pages/ArticleEdit'
import {LoginPage} from 'pages/Login'
import {RegistrationPage} from 'pages/Registration'
import {HomePage} from 'pages/Home'
import {LinkActivationPage} from 'pages/LinkActivation'
import {ArticlePage} from 'pages/Article'
import {ArticlesPage} from 'pages/Articles'
import {ConsultationPage} from 'pages/Consultation'
import {LoadingStatusEnum, UserRoleEnum} from 'shared/types'
import cls from 'classnames'
import styles from 'features/Layout/ui/index.module.scss'
import {Spinner} from '@chakra-ui/react'
import {useEffect} from 'react'
import {checkAuth} from 'features/Auth'
import {NotFoundPage} from 'pages/404'

export const AppRouter = () => {

    historyClass.navigate = useNavigate()
    historyClass.location = useLocation()

    const user: IUser | null = useAppSelector((state) => state.auth.user)
    const status: LoadingStatusEnum = useAppSelector((state) => state.auth.status)
    let loading: boolean = status === LoadingStatusEnum.LOADING

    const dispatch = useAppDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (loading) return (
        <div className={cls(styles.fullPage, styles.centerContent)}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.600'
                size='xl'
            />
        </div>
    )

    return (
        <Routes>
            {
                user ?
                <>
                    <Route path={CABINET_PAGE_PATH + '/:id'} element={<CabinetPage />} />
                    {
                        (user.role === UserRoleEnum.ADMIN) &&
                        <>
                            <Route path={ADMIN_PAGE_PATH} element={<AdminPage />} />
                            <Route path={ARTICLE_EDIT_PAGE_PATH} element={<ArticleEditPage />} />
                            <Route path={ARTICLE_EDIT_PAGE_PATH + '/:id'} element={<ArticleEditPage />} />
                        </>
                    }

                </>
                :
                <>
                    <Route path={LOGIN_PAGE_PATH} element={<LoginPage />} />
                    <Route path={REGISTER_PAGE_PATH} element={<RegistrationPage />} />
                </>
            }

            <Route path={HOME_PAGE_PATH} element={<HomePage />} />
            <Route path={ACTIVATION_PAGE_PATH} element={<LinkActivationPage />} />
            <Route path={ARTICLE_PAGE_PATH + '/:id'} element={<ArticlePage />} />
            <Route path={ARTICLES_PAGE_PATH + '/:theme?'} element={<ArticlesPage />} />
            <Route path={CONSULTATION_PAGE_PATH} element={<ConsultationPage />} />
            <Route path={NOT_FOUND_PAGE} element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to={user ? HOME_PAGE_PATH : LOGIN_PAGE_PATH} />}/>
        </Routes>
    )
}
