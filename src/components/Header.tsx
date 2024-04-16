import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/header.css'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [menu, setMenu] = useState<boolean>(false);
    const [icon, setIcon] = useState(faBars);

    const menuToggle = () => {
        if(menu) {
            setMenu(false);
            setIcon(faBars)
        } else {
            setMenu(true)
            setIcon(faClose)
        }
    }
    
    return (
        <header className={`nav ${menu ? 'nav-active' : ''}`}>
            <a href='/' className='title'>Blog K-12</a>
            <ul className='nav-links'>
                <li className='nav-item'><a href="/">Posts</a></li>
                <a className='login-button nav-item' href="/login"><li>Login</li></a>
                <a className='register-button nav-item' href="/register"><li>Registre-se</li></a>
            </ul>
            <FontAwesomeIcon icon={icon} onClick={menuToggle} className='menu'/>
        </header>
    )
}

export default Header