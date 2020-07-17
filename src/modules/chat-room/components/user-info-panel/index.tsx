import React, { useEffect, useState, useContext } from 'react';
import avatar from 'assets/images/avatar-lighter.svg';
import { UserForm } from './user-form';
import { UserContext } from 'context';
import { BaseButton } from 'components';

import './style.scss';

export function UserInfoPanel() {
    const userContext = useContext(UserContext);
    const [userForm, setUserForm] = useState({
        username: 'Username',
        userBio: 'Life as a beautiful flower.',
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const userInfoString = localStorage.getItem('user-info');
        if (userInfoString) {
            userContext.auth = true;
            const userInfo = JSON.parse(userInfoString);
            userContext.userId = userInfo.userId;
            userContext.username = userInfo.username;
            userContext.updateUser({
                username: userInfo.username,
                userBio: userInfo.userBio
            });
            userContext.authenticated();
            setUserForm(userInfo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeUserNameHandler = (e: any) => {
        const text = e.target.value;
        setUserForm(prev => ({
            ...prev,
            username: text
        }));
    };

    const onChangeBioHandler = (e: any) => {
        const text = e.target.value;
        setUserForm(prev => ({
            ...prev,
            userBio: text
        }));
    };

    const onOkHandle = () => {
        if (userForm.userBio === '' || userForm.username === '') {
            alert('Please input both username and bio');
        } else {
            userContext.authenticated();
            userContext.updateUser({
                username: userForm.username,
                userBio: userForm.userBio
            });
            userContext.saveData();
            setEditMode(false);
        }
    };

    console.log('userContext', userContext);

    return (
        <div className="user-info-panel">
            <div className="user-info-body">
                <div className="user-info-content">
                    <img className="avatar" src={avatar} alt='avatar' />
                    <p className="username">{userForm.username}</p>
                    <p className="bio">{userForm.userBio}</p>
                </div>
                {editMode ? (
                    <div>
                        <BaseButton
                            className="btn-blue btn-left-top"
                            onClick={() => setEditMode(false)}>
                            Cancel
                        </BaseButton>
                        <BaseButton
                            className="btn-blue btn-right-top"
                            onClick={onOkHandle}>
                            OK
                        </BaseButton>
                    </div>
                ) :
                    (
                        <BaseButton
                            className="btn-blue btn-right-top"
                            onClick={() => setEditMode(true)}>
                            Edit
                        </BaseButton>
                    )
                }
            </div>
            {editMode && (
                <UserForm
                    value={userForm}
                    changeUsername={onChangeUserNameHandler}
                    changeBio={onChangeBioHandler}
                />
            )}
        </div>
    );
}
