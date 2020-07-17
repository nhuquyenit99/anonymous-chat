import React, { useContext, useReducer } from 'react';
import avatar from 'assets/images/white-avatar.svg';
import { BaseButton } from 'components';
import { UserModel } from 'models';
import './style.scss';
import { UserContext } from 'context';

export function ConversationHeader({ user }: { user: UserModel }) {
    const userContext = useContext(UserContext);
    return (
        <div className='conversation-header'>
            <div className="user-info">
                <img src={avatar} alt='avatar' />
                <div className='username'>{user.username}</div>
            </div>
            {(userContext.auth && userContext.favoriteUsers[user.userId]) ?
                (<div>
                    <BaseButton className="btn-white" onClick={() => userContext.removeFavoriteUser(user)}>Unfavorite</BaseButton>
                    <BaseButton className="btn-white margin-left-sm">Add</BaseButton>
                </div>) :
                (<div>
                    <BaseButton className="btn-white" onClick={() => userContext.addFavoriteUser(user)}>Favorite</BaseButton>
                    <BaseButton className="btn-white margin-left-sm">Add</BaseButton>
                </div>)
            }
        </div>
    );
} 