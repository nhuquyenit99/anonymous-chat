import React, { useContext } from 'react';
import { PublicItem, UserItem } from 'components';
import { MessageItem, ConversationInput } from 'modules/chat-room/components';
import { UserContext } from 'context';
export function ChatRoomPage() {
    const user = useContext(UserContext);

    console.log('render ChatRoomPage');
    const data = { userId: '133', username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    const data1 = { userId: user.userId, username: 'Username', content: 'This is a message', read: true, time: '17:12' };
    return (
        <div>
            <div>This is home page</div>
            <PublicItem />
            {/* <UserInfoPanel /> */}
            <UserItem username="Nhim" userId="123456789" />
            <MessageItem data={data} />
            <MessageItem data={data1} />
            <MessageItem data={data} />
            <MessageItem data={data} />
            <ConversationInput topic='/public' />
        </div>
    );
}
