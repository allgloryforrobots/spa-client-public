import {Layout} from 'features/Layout'
import {AuthForm} from 'widgets/AuthForm'

export const RegistrationPage = () => {
    return (
        <Layout>
            <AuthForm isLogin={false} />
        </Layout>
    )
}
