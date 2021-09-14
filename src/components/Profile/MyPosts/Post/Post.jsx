import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <div className={s.avatar}>
                <img src='https://pikuco.ru/upload/test_stable/69c/69c0296d1ceebb3a0e9697c93c46e38e.jpg' alt='profile pic' />
                <span>like {props.likesCount}</span>
            </div>
            <div className={s.message}>
                {props.message}
            </div>
        </div>
    )

}

export default Post;