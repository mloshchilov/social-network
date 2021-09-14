import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';

const Users = ({currentPage, onPageChange, totalItemsCount, pageSize, ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} 
                       onPageChange={onPageChange} 
                       totalItemsCount={totalItemsCount}
                       pageSize={pageSize} 
            />
            {
                props.users.map(u => <User user={u} 
                                           followingInProgress={props.followingInProgress} 
                                           follow={props.follow}
                                           unfollow={props.unfollow} key={u.id} />)
            }
        </div>
    )
};


export default Users;