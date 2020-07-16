import React from 'react';
import { PublicItem, UserItem } from 'components';
import { ConversationInput } from 'modules/chat-room/components';

export function ChatRoomPage() {
    console.log('render ChatRoomPage');
    return (
        <div>
            <div>This is home page</div>
            <PublicItem />
            {/* <UserInfoPanel /> */}
            <UserItem username="Nhim" userId="123456789" />
            <ConversationInput topic='/public' />
        </div>
    );
}
