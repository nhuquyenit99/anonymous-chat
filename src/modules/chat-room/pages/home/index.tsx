import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';

export function ChatRoomPage() {
    const user = useContext(UserContext);
    let { topic } = useParams();

    console.log('render ChatRoomPage');

    return (
        <div style={{ flex: 1 }}>
            <ConversationBox topic='/public' userInfo={{ userId: 'PUBLIC', username: 'PUBLIC' }} />
        </div>
    );
}
