import {Layout} from 'features/Layout'
import {AuthForm} from 'widgets/AuthForm'

export const LoginPage = () => {
    return (
        <Layout>
            <AuthForm isLogin={true} />
        </Layout>
    )
}
