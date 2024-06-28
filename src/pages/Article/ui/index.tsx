import {Layout} from 'features/Layout'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useNavigate} from 'react-router';
import {ARTICLES_PAGE_PATH} from 'shared/constants'


export const ArticlePage = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id === 'edit') {
            navigate(ARTICLES_PAGE_PATH)
        }
    }, [id, navigate])

    return (
        <Layout>
            ArticlePage: {id}
        </Layout>
    )
}
