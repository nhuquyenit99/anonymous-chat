import React, { useContext, useState } from 'react';
import avatar from 'assets/images/white-avatar.svg';
import { BaseButton, BaseModal } from 'components';
import { UserModel } from 'models';
import './style.scss';
import { UserContext } from 'context';
import { AddUserModal } from 'modules/chat-room/components';

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

    const addFavoriteHandler = () => {
        userContext.addFavoriteUser(user);
    };
    const removeFavoriteUserHandler = () => {
        userContext.removeFavoriteUser(user);
        //window.location.href = `/${[userContext.userId, user.userId].sort().join('')}`;
    };

    const addHandler = () => {
        setShowModal(true);
    };

    const addCancelHandler = () => {
        setShowModal(false);
    };

    if (userContext.auth && userContext.favoriteUsers[user.userId])
        return (
            <ConversationHeaderLayout user={user} >
                <div>
                    <BaseButton className="btn-white" onClick={removeFavoriteUserHandler}>
                        Unfavorite
                    </BaseButton>
                    <BaseButton className="btn-white margin-left-sm" onClick={addHandler}>Add</BaseButton>
                </div>
                <AddUserModal userId={user.userId} visible={showModal} title='Add' modalClose={addCancelHandler} />
            </ConversationHeaderLayout>
        );
    if (userContext.auth && !userContext.favoriteUsers[user.userId])
        return (
            <ConversationHeaderLayout user={user}>
                <div>
                    <BaseButton className="btn-white" onClick={addFavoriteHandler}>Favorite</BaseButton>
                    <BaseButton className="btn-white margin-left-sm" onClick={addHandler}>Add</BaseButton>
                    <AddUserModal userId={user.userId} visible={showModal} title='Add' modalClose={addCancelHandler} />
                </div>
            </ConversationHeaderLayout >
        );
    return <ConversationHeaderLayout user={user} />;

} 