import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';

export function PrivateChatRoom() {
    const userContext = useContext(UserContext);
    let { topic } = useParams();

    console.log('render ChatRoomPage');
    let userId = topic.split(userContext.userId);

    return (
        <div style={{ flex: 1 }}>
            <ConversationBox topic={topic} userInfo={{ userId: 'PUBLIC', username: 'PUBLIC' }} />
        </div>
    );
}
