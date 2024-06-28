import {Layout} from 'features/Layout'
import notFoundImg from '../assets/404.jpg'
import {Button} from '@chakra-ui/react'
import React from 'react'
import {useNavigate} from 'react-router'
import {HOME_PAGE_PATH} from 'shared/constants'

export const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <Layout>
            <img src={notFoundImg}  alt='Изображение, страница не найдена'/>
            <Button
                colorScheme='green'
                variant='solid'
                onClick={() => navigate(HOME_PAGE_PATH)}
            >
                На главную
            </Button>
        </Layout>
    )
}
