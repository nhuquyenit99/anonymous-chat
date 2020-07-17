import React from 'react';
import avatar from 'assets/images/white-avatar.svg';
import { BaseButton } from 'components';
import { UserModel } from 'models';
import './style.scss';
import { UserContext } from 'context';

export function ConversationHeader({ userId, username }: UserModel) {
    return (
        <div className='conversation-header'>
            <UserContext.Consumer>
                {(context) => (<div className="user-info">
                    <img src={avatar} alt='avatar' />
                    <div className='username'>{context.username}</div>
                </div>)}
            </UserContext.Consumer>
            <UserContext.Consumer>
                {(value) => {
                    console.log('AUTH', value.auth);
                    if (value.auth) return (<div>
                        <BaseButton className="btn-white">Favorite</BaseButton>
                        <BaseButton className="btn-white margin-left-sm">Add</BaseButton>
                    </div>);
                }}
            </UserContext.Consumer>
        </div>
    );
}