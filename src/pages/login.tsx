import React from "react";
import styles from "../styles/form.module.css"

const Login = () => {
    return (
        <form className={styles['form']}>
            <h1 className={styles['title']}>Login</h1>
            <p className={styles['question-account']}>Novo no site? <a href="/register">Registre-se</a></p>
            <div className={styles['input-section']}>
                <label htmlFor="email" className={styles['label']}>Email:</label>
                <input type="email" id="email" placeholder="Email..." className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="password" className={styles['label']}>Senha:</label>
                <input type="password" id="password" placeholder="Senha..." className={styles['input']} />
            </div>
            <input type="submit" value="Login" className={styles['submit']}/>
        </form>
    )
}

export default Login;