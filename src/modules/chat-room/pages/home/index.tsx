import React, { useContext } from 'react';
import { ConversationInput, ConversationMessage } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { ConversationHeader } from 'modules/chat-room/components/conversation-header';
import { useParams } from 'react-router-dom';

export function ChatRoomPage() {
    const user = useContext(UserContext);
    let { slug } = useParams();

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
            <div>
                <ConversationHeader user={{ userId: 'abc', username: 'Username' }} />
                <ConversationMessage data={data} />
                <ConversationInput topic='/public' />
            </div>

        </div>
    );
}
