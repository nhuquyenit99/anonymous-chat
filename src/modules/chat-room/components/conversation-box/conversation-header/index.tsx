import React, { useContext, useState } from 'react';
import avatar from 'assets/images/white-avatar.svg';
import { BaseButton } from 'components';
import { UserModel } from 'models';
import './style.scss';
import { UserContext } from 'context';
import { AddUserModal } from 'modules/chat-room/components';
import { getClient } from 'client';
import { useHistory } from 'react-router-dom';

type ConversationLayout = {
    user: UserModel
    children?: any
}

function ConversationHeaderLayout({ user, children }: ConversationLayout) {
    return (
        <div className='conversation-header'>
            <div className="user-info">
                <img src={avatar} alt='avatar' />
                <div className='username'>{user.username}</div>
            </div>
            {children}
        </div>
    );
}

export function ConversationHeader({ user }: { user: UserModel }) {
    const userContext = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const isGroup = user.username.includes(',');

    const addFavoriteHandler = () => {
        userContext.addFavoriteUser(user);
        history.push(`/favorite/${[userContext.userId, user.userId].sort().join('')}`);
    };
    const removeFavoriteUserHandler = () => {
        userContext.removeFavoriteUser(user);
        history.push(`/${[userContext.userId, user.userId].sort().join('')}`);
    };

    const addHandler = () => {
        setShowModal(true);
    };

    const addCancelHandler = () => {
        setShowModal(false);
    };

    const addUserHandler = (u: UserModel) => {
        let usersInGroup = [];
        if (isGroup) {
            const chatId = user.userId;
            usersInGroup = [...userContext.groups[chatId].users, u];
            userContext.addGroup(usersInGroup);


            getClient().publish('/group', JSON.stringify(usersInGroup));
            // history.push(`/group/${[...usersInGroup.map(user => user.userId), u.userId].sort().join('')}`);
        } else {
            const myInfo = {
                userId: userContext.userId,
                username: userContext.username
            };
            usersInGroup = [myInfo, user, u];
            userContext.addGroup(usersInGroup);
            //getClient().publish('/group', JSON.stringify(groupInfo));
            setShowModal(false);

            // history.push(`/group/${[myInfo.userId, user.userId, u.userId].sort().join('')}`);
        }
        getClient().publish('/group', JSON.stringify(usersInGroup));
    };

    if (user.username === 'PUBLIC' || userContext.auth === false) {
        return <ConversationHeaderLayout user={user} />;
    }
    if (isGroup) {
        return (
            <ConversationHeaderLayout user={user} >
                <div>
                    <BaseButton className="btn-white margin-left-sm" onClick={addHandler}>Add</BaseButton>
                </div>
                <AddUserModal
                    userId={user.userId}
                    visible={showModal} title='Add'
                    modalClose={addCancelHandler}
                    addUser={addUserHandler}
                    data={Object.values(userContext.activeUsers)} />
            </ConversationHeaderLayout>
        );
    }

    if (userContext.auth && userContext.favoriteUsers[user.userId]) {
        return (
            <ConversationHeaderLayout user={user} >
                <div>
                    <BaseButton className="btn-white" onClick={removeFavoriteUserHandler}>
                        Unfavorite
                    </BaseButton>
                    <BaseButton className="btn-white margin-left-sm" onClick={addHandler}>Add</BaseButton>
                </div>
                <AddUserModal
                    userId={user.userId}
                    visible={showModal} title='Add'
                    modalClose={addCancelHandler}
                    addUser={addUserHandler}
                    data={Object.values(userContext.activeUsers)} />
            </ConversationHeaderLayout>
        );
    }
    return (
        <ConversationHeaderLayout user={user}>
            <div>
                <BaseButton className="btn-white" onClick={addFavoriteHandler}>Favorite</BaseButton>
                <BaseButton className="btn-white margin-left-sm" onClick={addHandler}>Add</BaseButton>
                <AddUserModal
                    userId={user.userId}
                    visible={showModal} title='Add'
                    modalClose={addCancelHandler}
                    addUser={addUserHandler}
                    data={Object.values(userContext.activeUsers)} />
            </div>
        </ConversationHeaderLayout >
    );

} 