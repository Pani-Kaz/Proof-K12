import React from "react";
import styles from "../styles/notFound.module.css"

const NotFound = () => {
    return (
        <div className={styles['NotFound']}>
            <h1 className={styles['title']}>404</h1>
            <p className={styles['text']}>Não foi possivel econtrar a página solicitada!</p>
            <a href="/">Clique aqui para ir á página principal</a>
        </div>
    )
}

export default NotFound;