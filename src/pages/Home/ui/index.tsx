import {Layout} from 'features/Layout'
import {Button, Heading, Text} from '@chakra-ui/react'
import homePageBg from 'pages/Home/assets/home_page_bg.jpg'
import styles from './index.module.scss'
import {NavLink} from 'react-router-dom'
import {ARTICLES_PAGE_PATH} from 'shared/constants'

export const HomePage = () => {
    return (
        <Layout>
            <div className={styles.headerContainer}>
                <Heading as='h1' size='2xl'>
                    Наша миссия - сделать жизнь пожилых людей лучше
                </Heading>
            </div>
            <div className={styles.homeInfoContainer}>
                <Text fontSize='2xl'>
                    Узнайте больше о том, как улучшить здоровье, найти работу для пожилых и заниматься хобби
                </Text>
            </div>

            <NavLink to={ARTICLES_PAGE_PATH}>
                <Button
                    className={styles.allArticlesBtn}
                    colorScheme='green'
                    size='lg'
                >
                    Все статьи
                </Button>
            </NavLink>

            <img
                className={styles.homeBgImg}
                src={homePageBg}
                alt="Изображение гуляющих на природе пожилых людей"
            />
        </Layout>
    )
}
