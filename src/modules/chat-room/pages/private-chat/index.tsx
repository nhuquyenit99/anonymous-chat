import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'components';

export function PrivateChatRoom() {
    console.log('render PrivateChatRoom');
    const userContext = useContext(UserContext);
    let { topic } = useParams();
    let userId = topic.split(userContext.userId).find((item: string) => item !== '');

    if (userContext.activeUsers[userId])
        return (
            <ConversationBox topic={`/${topic}`} userInfo={userContext.activeUsers[userId]} />
        );
    return (<NotFoundPage />);
}
