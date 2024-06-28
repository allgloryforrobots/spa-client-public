import styles from './index.module.scss'

export const Footer = () => {

    return (
        <footer className={styles.footer}>

            <div className={styles.bgImage}></div>
            <div className={styles.colorBg}></div>

            <div className={styles.subtitle}>Информация</div>

            <div className={styles.line}></div>

            <div className={styles.links}>
                <div className={styles.link}>О нас</div>
                <div className={styles.link}>Часто задаваемые вопросы</div>
                <div className={styles.link}>Поддержка</div>
            </div>

            <div className={styles.line}></div>

            <div className={styles.subtitle}>ИВЦ © 2024</div>

        </footer>
    )
    
}
