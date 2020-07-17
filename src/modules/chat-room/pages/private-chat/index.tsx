import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';
import { UserModel } from 'models';
import { NotFoundPage } from 'components';

export function PrivateChatRoom() {
    const userContext = useContext(UserContext);
    let { userId } = useParams();
    const topic = `/${[userContext.userId, userId].sort().join('')}`;
    const userInfo = userContext.activeUsers[userId];
    console.log('User info: ', userInfo);
    console.log('render PrivateChatRoom');
    if (userContext.activeUsers[userId])
        return (
            <ConversationBox topic={topic} userInfo={userContext.activeUsers[userId]} />
        );
    return (<NotFoundPage />);
}
