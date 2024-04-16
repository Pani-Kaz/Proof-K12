import React, { useEffect, useState } from "react";
import styles from "../styles/form.module.css"

const Register = () => {
    const [error, setError] = useState("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const regex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) return setError('Preencha todos os campos!');
        else if (name?.length > 16) setError('O nome deve conter até 16 caracteres');
        else if (name.length < 3) setError('O nome deve conter no minimo 3 caracteres');
        else if (!regex.test(email)) setError('Por favor insira um email válido!');
        else {
            setError('Houve um erro ao realizar seu registro!')
        }
    };

    useEffect(() => {
        if (name?.length > 16) setError('O nome deve conter até 16 caracteres');
        else setError('')
    }, [name]);

    useEffect(() => {
        if (!email) return
        else if (!regex.test(email)) setError('Por favor insira um email válido!');
        else setError('')
    }, [email])

    return (
        <form className={styles['form']}>
            <h1 className={styles['title']}>Registre-se</h1>
            <p className={styles['question-account']}>Já tem uma conta? <a href="/login">Faça login</a></p>
            <p className={styles['error']}>{error}</p>
            <div className={styles['input-section']}>
                <label htmlFor="name" className={styles['label']}>Nome:</label>
                <input type="text" id="name" placeholder="Nome..." onChange={(e: any) => setName(e.target.value)} className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="email" className={styles['label']}>Email:</label>
                <input type="email" id="email" placeholder="Email..." onChange={(e: any) => setEmail(e.target.value)} className={styles['input']} />
            </div>
            <div className={styles['input-section']}>
                <label htmlFor="password" className={styles['label']}>Senha:</label>
                <input type="password" id="password" placeholder="Senha..." onChange={(e: any) => setPassword(e.target.value)} className={styles['input']} />
            </div>
            <input onClick={submit} type="submit" value="Registrar" className={styles['submit']} />
        </form>
    )
}

export default Register;