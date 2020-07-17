import React, { useContext } from 'react';
import { ConversationInput, ConversationMessage } from 'modules/chat-room/components';
import { UserContext } from 'context';
export function ChatRoomPage() {
    const user = useContext(UserContext);

    console.log('render ChatRoomPage');
    const data = [
        { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' },
        { userId: user.userId, username: 'Username', content: 'This is a message', read: true, time: '17:12' },
        { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' },
        { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' },
        { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' },
        { userId: user.userId, username: 'Username', content: 'This is a message', read: true, time: '17:12' },
    ];

    return (
        <div style={{ flex: 1 }}>
            <div>This is home page</div>
            <div>
                <ConversationMessage data={data} />
                <ConversationInput topic='/public' />
            </div>

        </div>
    );
}
