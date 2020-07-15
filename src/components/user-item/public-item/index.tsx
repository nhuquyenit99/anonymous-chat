import React, { useState, useContext, useEffect } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, PublicChannelContext } from 'context';

export function PublicItem() {
    console.log('render PublicItem');
    const publicChannel = useContext(PublicChannelContext);
    const user = useContext(UserContext);

    const message = publicChannel.listMessage[publicChannel.listMessage.length - 1];

    const [lastestMessage, setLastestMessage] = useState({ content: message, read: false });
    const [countActiveUsers, setCountActiveUsers] = useState(publicChannel.activeUsers.length);

    getClient().subscribe('public');
    getClient().subscribe('/new_user');
    getClient().subscribe('/active_user');
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/public') {
                console.log('Receive message');
                const mes = message.toString();
                const lastestMes = { content: mes, read: false };
                publicChannel.listMessage.push(mes);
                console.log(publicChannel.listMessage);
                setLastestMessage(lastestMes);
            }
        });
    }, [publicChannel.listMessage]);
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/new_user') {
                console.log('Have a new user: ', message.toString());
                publicChannel.activeUsers = [];
                getClient().publish('/active_user', user.userId);
                getClient().on('message', (topic: any, message: any) => {
                    if (topic === '/active_user') {
                        console.log('Active user:', message.toString());
                        publicChannel.activeUsers.push(message.toString());
                        setCountActiveUsers(publicChannel.activeUsers.length);
                    }
                });
            }
        });

    }, [publicChannel.activeUsers, user.userId]);
    return (
        <div key='/public' className='user-item blue-bg'>
            <div className='avatar'>
                <img src={avatar} alt='avatar' />
            </div>
            <div className='item-content'>
                <h5 className="item-name">PUBLIC</h5>
                <p className={`lastest-message ${!lastestMessage.read ? 'unread' : ''}`}>{lastestMessage.content}</p>
            </div>
            <p className='extra'>{countActiveUsers} Users</p>
        </div>
    );
}
