import React from 'react';
import { BaseList, UserItem, BaseModal, UserInfoPanel } from 'components';
import { UserModel } from 'models';

export function ChatRoomPage() {
    const [show, setShow] = React.useState(false);

    const close = () => {
        setShow(false);
    };
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
            <BaseList<UserModel> data={data} Item={UserItem} />
            <button onClick={() => setShow(true)}>Click me show madal</button>
            <BaseModal<UserModel>
                data={data}
                Item={UserItem}
                handleShow={show}
                handleClose={() => setShow(false)}
            />
            <UserInfoPanel />
        </div>
    );
}
