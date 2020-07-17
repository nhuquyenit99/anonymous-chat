import React, { useContext } from 'react';
import avatar from 'assets/images/white-avatar.svg';
import { BaseButton } from 'components';
import { UserModel } from 'models';
import './style.scss';
import { UserContext } from 'context';

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
    if (user.username === 'PUBLIC')
        return <ConversationHeaderLayout user={user} />;
    if (userContext.auth && userContext.favoriteUsers[user.userId])
        return (
            <ConversationHeaderLayout user={user} >
                <div>
                    <BaseButton className="btn-white" onClick={() => userContext.removeFavoriteUser(user)}>Unfavorite</BaseButton>
                    <BaseButton className="btn-white margin-left-sm">Add</BaseButton>
                </div>
            </ConversationHeaderLayout>
        );
    return (
        <ConversationHeaderLayout user={user}>
            <div>
                <BaseButton className="btn-white" onClick={() => userContext.addFavoriteUser(user)}>Favorite</BaseButton>
                <BaseButton className="btn-white margin-left-sm">Add</BaseButton>
            </div>
        </ConversationHeaderLayout >
    );
} 