import React, { useEffect, useState, useContext } from 'react';
import avatar from 'assets/images/avatar-lighter.svg';
import { UserForm } from './user-form';
import { UserContext } from 'context';

import './style.scss';

export function UserInfoPanel() {
    const user = useContext(UserContext);
    const [userForm, setUserForm] = useState({
        username: 'Username',
        userBio: 'Life as a beautiful flower.',
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const userInfoString = localStorage.getItem('user-info');
        if (userInfoString) {
            user.auth = true;
            const userInfo = JSON.parse(userInfoString);
            user.userId = userInfo.userId;
            setUserForm(userInfo);
        }
    }, [user.auth, user.userId]);

    const onChangeUserNameHandler = (e: any) => {
        const text = e.target.value;
        if (text !== '') {
            setUserForm(prev => ({
                ...prev,
                username: text
            }));
        }
    };

    const onChangeBioHandler = (e: any) => {
        const text = e.target.value;
        if (text !== '') {
            setUserForm(prev => ({
                ...prev,
                userBio: text
            }));
        }
    };

    const onOkHandle = () => {
        setEditMode(false);
        if (user.auth === false) {
            user.auth = true;
        }
        const userInfo = {
            userId: user.userId,
            username: userForm.username,
            userBio: userForm.userBio,
        };
        const userInfoString = JSON.stringify(userInfo);
        localStorage.setItem('user-info', userInfoString);
    };

    return (
        <div className="user-info-panel">
            <div className="user-info-body">
                <div className="user-info-content">
                    <img className="avatar" src={avatar} />
                    <p className="username">{userForm.username}</p>
                    <p className="bio">{userForm.userBio}</p>
                </div>
                {editMode ? (
                    <div>
                        <button
                            className="btn btn-left-top"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-right-top" onClick={onOkHandle}>
                            OK
                        </button>
                    </div>
                ) : (
                    <button
                        className="btn btn-right-top"
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                )}
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
