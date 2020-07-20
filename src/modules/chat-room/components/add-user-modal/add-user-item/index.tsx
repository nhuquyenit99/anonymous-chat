import React from 'react';
import './style.scss';
import { UserModel } from 'models';
import avatar from 'assets/images/avatar.svg';
import { BaseButton } from 'components';

type AddUserItemType = {
    userId: string
    username: string,
    onAdd: (u: UserModel) => void
}

export function AddUserItem({ data }: { data: AddUserItemType }) {
    const userInfo = {
        userId: data.userId,
        username: data.username
    };
    return (
        <div className='add-user-item'>
            <img src={avatar} alt='avatar' />
            <h5 className="username">{data.username}</h5>
            <BaseButton className='btn-white-small' onClick={() => data.onAdd(userInfo)}>Add</BaseButton>
        </div>
    );
}