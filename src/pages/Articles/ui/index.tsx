import {Layout} from 'features/Layout'
import {useParams} from 'react-router-dom'

export const ArticlesPage = () => {

    const { theme } = useParams()

    return (
        <Layout>
            ArticlesPage: {theme}
        </Layout>
    )
}
