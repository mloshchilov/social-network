import React from 'react';
import style from '../Users.module.css';
import userPhoto from '../../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const User = ({user, ...props}) => {
    return (
        <div className={style.container}>
            <div className={style.left}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar" className={style.profilePic}/>
                </NavLink>
                {user.followed
                    ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.unfollow(user.id)}}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.follow(user.id)}}>Follow</button>}
            </div>
            <div className={style.right}>
                <div className={style.descr}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={style.location}>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </div>
            </div>
        </div>
    )
};


export default User;