import {Button} from '@chakra-ui/react'
import styles from './index.module.scss'
import {AuthApi} from 'features/Auth'
import {
    HEALTH_ARTICLES_PAGE_PATH,
    HOBBY_ARTICLES_PAGE_PATH,
    JOB_ARTICLES_PAGE_PATH,
    HOME_PAGE_PATH,
    LOGIN_PAGE_PATH,
    CONSULTATION_PAGE_PATH
} from 'shared/constants'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {useAppSelector} from 'app/store'
import {IUser} from 'entities/User'
import { NavLink } from 'react-router-dom'

export const Header = () => {

    const user: IUser | null = useAppSelector((state) => state.auth.user)
    const navigate: NavigateFunction = useNavigate()

    const onLoginLinkClick = () => navigate(LOGIN_PAGE_PATH)
    const onLogoutClick = async (): Promise<void> => {
        await AuthApi.logout()
        navigate(LOGIN_PAGE_PATH)
    }

    return (
        <div className={styles.header}>

            <NavLink to={HOME_PAGE_PATH}>
                <div className={styles.logo}></div>
            </NavLink>

            <NavLink to={HEALTH_ARTICLES_PAGE_PATH}>
                <Button colorScheme='green' variant='ghost' size='lg'>
                    Здоровье
                </Button>
            </NavLink>

            <NavLink to={JOB_ARTICLES_PAGE_PATH}>
                <Button colorScheme='green' variant='ghost' size='lg'>
                    Работа
                </Button>
            </NavLink>

            <NavLink to={HOBBY_ARTICLES_PAGE_PATH}>
                <Button colorScheme='green' variant='ghost' size='lg'>
                    Хобби
                </Button>
            </NavLink>

            <NavLink to={CONSULTATION_PAGE_PATH}>
                <Button colorScheme='green' variant='ghost' size='lg'>
                    Консультация
                </Button>
            </NavLink>

            <div className="nav-right">
                {
                    user ?
                    <Button onClick={onLogoutClick} colorScheme='green' variant='outline'>
                        Выйти
                    </Button>
                     :
                        <Button onClick={onLoginLinkClick} colorScheme='green' variant='outline'>
                        Войти
                    </Button>
                }
            </div>
        </div>
    )
}
