import React from 'react';
import s from'./Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg' alt='header pic' />
        <div className={s.loginBlock}>
            {props.isAuth ? <div> <div>{props.login}</div> <div><button onClick={props.logout}>Logout</button></div> </div> : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;