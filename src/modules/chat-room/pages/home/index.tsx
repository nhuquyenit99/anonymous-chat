import React from 'react';
import { UserInfoPanel, ActiveUserPanel } from 'components';
//import { UserModel } from 'models';

export function ChatRoomPage() {
    console.log('render ChatRoomPage');
    const data = [
        {
            id: 'adj',
            username: 'username',
        },
        {
            id: 'abc',
            username: 'username',
        },
        {
            id: 'ab',
            username: 'username',
        },
    ];
    return (
        <div>
            <p>This is home page.</p>
        </div>
    );
}
