import React, { useContext } from 'react';
import { MessageItem, ConversationInput } from 'modules/chat-room/components';
import { UserContext } from 'context';
export function ChatRoomPage() {
    const user = useContext(UserContext);

    console.log('render ChatRoomPage');
    const data = { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    const data1 = { userId: user.userId, username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    return (
        <div>
            <div style={{ flex: 1 }}>This is home page</div>
            <MessageItem data={data} />
            <MessageItem data={data1} />
            <MessageItem data={data} />
            <MessageItem data={data} />
            <ConversationInput topic='/public' />
        </div>
    );
}
