import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'components';

export function GroupChatRoom() {
    console.log('render PrivateChatRoom');
    const userContext = useContext(UserContext);
    let { topic } = useParams();

    if (userContext.groups[topic]) {
        const chatInfo = userContext.groups[topic];
        const chatInfoConfig = {
            userId: chatInfo.userId,
            username: chatInfo.users.map(item => item.username).sort().join(', ')
        };
        return (
            <ConversationBox topic={`/group/${topic}`} userInfo={chatInfoConfig} />
        );
    }
    return (<NotFoundPage />);
}

