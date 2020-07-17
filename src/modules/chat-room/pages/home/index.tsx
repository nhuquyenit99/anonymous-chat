import React, { useContext } from 'react';
import { MessageItem, ConversationInput } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { ConversationHeader } from 'modules/chat-room/components/conversation-header';
import { useParams } from 'react-router-dom';

export function ChatRoomPage() {
    const user = useContext(UserContext);
    let { slug } = useParams();

    const data = { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    const data1 = { userId: user.userId, username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    return (
        <div style={{ flex: 1 }}>
            <ConversationHeader user={{ userId: 'abc', username: 'Username' }} />
            <MessageItem data={data} />
            <MessageItem data={data1} />
            <MessageItem data={data} />
            <MessageItem data={data} />
            <ConversationInput topic='/public' />
        </div>
    );
}
