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
}

export function AddUserModal(
    { userId, title, visible, modalClose }: AddUserModalType
) {
    const userContext = useContext(UserContext);

    const [data, setData] = useState([{ userId: '', username: '' }]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setData(Object.values(userContext.activeUsers).filter((user) => user.userId !== userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            console.log(searchValue.length);
            const textLength = searchValue.length;
            const newData = Object.values(userContext.activeUsers).filter((user) => {
                console.log('username slice: ', user.username.slice(0, textLength - 1));
                if (user.username.slice(0, textLength - 1).toLowerCase() === searchValue.toLowerCase()) {
                }
                return user;
            });
            setData(newData);
        }
    };

    const onChangeSearchHandler = (e: any) => {
        const text = e.target.value;
        console.log(text);
        setSearchValue(text);
    };

    return (
        <BaseModal title={title} visible={visible} modalClose={modalClose}>
            <input className='btn-search' type='search'
                placeholder='Search...' value={searchValue}
                onChange={onChangeSearchHandler}
                onKeyDown={onKeyDownHandler} />
            {(data.length > 0) ? <BaseList<UserModel> data={data} Item={AddUserItem} /> :
                <p className='noti'>There is no one else!</p>}
        </BaseModal>
    );
}