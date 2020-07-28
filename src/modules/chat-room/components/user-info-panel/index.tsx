import React, { useState, useContext } from 'react';
import avatar from 'assets/images/avatar-lighter.svg';
import { UserForm } from './user-form';
import { UserContext } from 'context';
import { BaseButton } from 'components';

import './style.scss';
import { getClient } from 'client';

export function UserInfoPanel() {
    const userContext = useContext(UserContext);
    const [userForm, setUserForm] = useState({
        username: userContext.username,
        userBio: userContext.userBio,
    });

    const [editMode, setEditMode] = useState(false);

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
            setEditMode(false);

        }
    };
    const onCancelHandler = () => {
        setUserForm({
            username: userContext.username,
            userBio: userContext.userBio
        });
        setEditMode(false);
        sendInfo();
    };

    const sendInfo = () => {
        //userContext.clearActiveUsers();
        const userInfo = {
            userId: userContext.userId,
            username: userContext.username
        };
        const userInfoMes = JSON.stringify(userInfo);
        getClient().publish('/active_user', userInfoMes);
    };
    //console.log('userContext', userContext);
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
                            onClick={onCancelHandler}>
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
