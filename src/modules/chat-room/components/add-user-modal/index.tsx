import React, { useState, useEffect } from 'react';
import { AddUserItem } from './add-user-item';
import { BaseModal, BaseList } from 'components';
import { UserModel } from 'models';
import './style.scss';

type AddUserModalType = {
    userId: string
    title: string
    visible: boolean
    data: Array<UserModel>
    modalClose: () => void
    addUser: (u: UserModel) => void
}

type AddUserItemType = {
    userId: string
    username: string,
    onAdd: (u: UserModel) => void
}

export function AddUserModal(
    { userId, title, visible, data, modalClose, addUser }: AddUserModalType
) {

    const [userData, setUserData] = useState([{ userId: '', username: '', onAdd: (u: UserModel) => { } }]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let newData = [];
        if (userId.length > 32) {
            const userIds = configUserId(userId);

            newData = data.filter((user) => {
                let check = true;
                for (let u of userIds) {
                    if (user.userId === u) check = false;
                }
                return check;
            });
        } else {
            newData = data.filter((user) => user.userId !== userId);
        }
        setUserData(configData(newData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, userId]);

    const configUserId = (userId: string) => {
        console.log(userId);
        let users = [];
        for (let i = 0; i < userId.length; i += 16) {
            users.push(userId.slice(i, i + 16));
        }
        console.log('UserIds config', users);
        return users;
    };

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            console.log(searchValue.length);
            const newData = data.filter((user) =>
                (user.username.toLowerCase().includes(searchValue)));
            setUserData(configData(newData));
        }
    };

    const onChangeSearchHandler = (e: any) => {
        const text = e.target.value;
        console.log(text);
        setSearchValue(text);
        const newData = data.filter((user) => user.userId !== userId);
        setUserData(configData(newData));
    };


    const configData = (data: Array<UserModel>) => {
        return data.map((item) => {
            return {
                ...item,
                onAdd: addUser
            };
        });
    };

    return (
        <BaseModal title={title} visible={visible} modalClose={modalClose}>
            <input className='input-search' type='search'
                placeholder='Search...' value={searchValue}
                onChange={onChangeSearchHandler}
                onKeyDown={onKeyDownHandler} />
            {(userData.length > 0) ? <BaseList<AddUserItemType> data={userData} Item={AddUserItem} /> :
                <p className='noti'>There is no one!</p>}
        </BaseModal>
    );
}
