import React from 'react';
import { ConversationBox } from 'modules/chat-room/components';

export function ChatRoomPage() {
    console.log('render ChatRoomPage');

    return (
        <ConversationBox topic='/public' userInfo={{ userId: 'PUBLIC', username: 'PUBLIC' }} />
    );
}
