import React from 'react';
import { NavLink } from 'react-router-dom';
import s from'./Navbar.module.css';

const Nav = () => {
    return <nav className={s.nav}>
        <div className={s.link}>
            <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        <div className={s.link}>
            <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.link}>
            <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
        </div>
        <div className={s.link}>
            <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.link}>
            <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.link}>
            <NavLink to='settings' activeClassName={s.activeLink}>Settings</NavLink>
        </div>
    </nav>
}

export default Nav;