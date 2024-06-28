import styles from 'pages/ArticleEdit/ui/index.module.scss'
import {Alert, AlertDescription, AlertIcon, AlertTitle, Button} from '@chakra-ui/react'
import {Layout} from 'features/Layout'
import {useNavigate} from 'react-router'
import {FC} from 'react'

type LoadingErrorProps = {
    message?: string
}

export const LoadingError: FC<LoadingErrorProps> = ({message = 'Ошибка загрузки страницы'}) => {

    const navigate = useNavigate()

    return (
        <Layout>
            <div className={styles.articleContainer}>
                <Alert status='error' className={styles.alertPanel}>
                    <AlertIcon/>
                    <AlertTitle>{message}</AlertTitle>
                    <AlertDescription></AlertDescription>
                </Alert>

                <Button
                    colorScheme='green'
                    variant='solid'
                    onClick={() => navigate(0)}
                >
                    Перезагрузить
                </Button>
            </div>
        </Layout>
    )
}
