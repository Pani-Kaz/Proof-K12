import React, { useEffect, useState } from "react";
import styles from "../styles/form.module.css"

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const regex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) return setError('Preencha todos os campos!');
        else if (!regex.test(email)) setError('Por favor insira um email válido!');
        else {
            setError('Houve um erro ao realizar seu login!')
        }
    };
    useEffect(() => {
        if (!email) return
        else if (!regex.test(email)) setError('Por favor insira um email válido!');
        else setError('')
    }, [email]);

    return (
        <form className={styles['form']}>
            <h1 className={styles['title']}>Login</h1>
            <p className={styles['question-account']}>Novo no site? <a href="/register">Registre-se</a></p>
            <p className={styles['error']}>{error}</p>
            <div className={styles['input-section']}>
                <label htmlFor="email" className={styles['label']}>Email:</label>
                <input type="email" id="email" placeholder="Email..." onChange={(e: any) => setEmail(e.target.value)} className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="password" className={styles['label']}>Senha:</label>
                <input type="password" id="password" placeholder="Senha..." onChange={(e: any) => setPassword(e.target.value)} className={styles['input']} />
            </div>
            <input onClick={submit} type="submit" value="Login" className={styles['submit']}/>
        </form>
    )
}

export default Login;