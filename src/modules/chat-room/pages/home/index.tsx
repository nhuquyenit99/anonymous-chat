import React from 'react';
import { BaseList, BaseModal, UserInfoPanel, PublicItem, UserItem } from 'components';
import { UserModel } from 'models';

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
            <div>This is home page</div>
            <PublicItem />
            <UserInfoPanel />
            <UserItem username="Nhim" userId="123456789" />
        </div>
    );
}
