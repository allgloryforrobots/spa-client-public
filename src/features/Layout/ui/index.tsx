import {FC, ReactNode} from 'react'
import styles from './index.module.scss'
import {Header} from 'widgets/Header/ui'
import {Footer} from 'widgets/Footer'
import {ToastContainer} from 'features/GlobalToast'


type LayoutProps = {
    children?: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {

    return (
        <>
            <div className={styles.fullPage}>
                <Header />
                <main className={styles.mainContainer}>
                    {children}
                </main>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    )

}