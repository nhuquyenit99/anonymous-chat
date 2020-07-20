import React, { useContext, useState, useEffect } from 'react';
import { AddUserItem } from './add-user-item';
import { BaseModal, BaseList } from 'components';
import { UserContext } from 'context';
import { UserModel } from 'models';
import './style.scss';

type AddUserModalType = {
    userId: string
    title: string
    visible: boolean
    modalClose: () => void
    addUser: (u: UserModel) => void
}

type AddUserItemType = {
    userId: string
    username: string,
    onAdd: (u: UserModel) => void
}

export function AddUserModal(
    { userId, title, visible, modalClose, addUser }: AddUserModalType
) {
    const userContext = useContext(UserContext);

    const [data, setData] = useState([{ userId: '', username: '', onAdd: (u: UserModel) => { } }]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const newData = configData(Object.values(userContext.activeUsers).filter((user) => user.userId !== userId));
        setData(newData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            console.log(searchValue.length);
            const newData = Object.values(userContext.activeUsers).filter((user) =>
                (user.username.toLowerCase().includes(searchValue)));
            setData(configData(newData));
        }
    };

    const onChangeSearchHandler = (e: any) => {
        const text = e.target.value;
        console.log(text);
        setSearchValue(text);
        const newData = configData(Object.values(userContext.activeUsers).filter((user) => user.userId !== userId));
        setData(newData);
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
            {(data.length > 0) ? <BaseList<AddUserItemType> data={data} Item={AddUserItem} /> :
                <p className='noti'>There is no one!</p>}
        </BaseModal>
    );
}
