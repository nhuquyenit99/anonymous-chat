import React from 'react';
import './style.scss';
import { UserModel } from 'models';
import avatar from 'assets/images/avatar.svg';
import { BaseButton } from 'components';

export function AddUserItem({ data }: { data: UserModel }) {
    return (
        <div className='add-user-item'>
            <img src={avatar} alt='avatar' />
            <h5 className="username">{data.username}</h5>
            <BaseButton className='btn-white-small'>Add</BaseButton>
        </div>
    );
}