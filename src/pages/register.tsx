import React from "react";
import styles from "../styles/form.module.css"

const Register = () => {
    return (
        <form className={styles['form']}>
            <h1 className={styles['title']}>Registre-se</h1>
            <p className={styles['question-account']}>Já tem uma conta? <a href="/login">Faça login</a></p>
            <div className={styles['input-section']}>
                <label htmlFor="name" className={styles['label']}>Nome:</label>
                <input type="text" id="name" placeholder="Nome..." className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="email" className={styles['label']}>Email:</label>
                <input type="email" id="email" placeholder="Email..." className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="password" className={styles['label']}>Senha:</label>
                <input type="password" id="password" placeholder="Senha..." className={styles['input']} />
            </div>
            <input type="submit" value="Registrar" className={styles['submit']}/>
        </form>
    )
}

export default Register;