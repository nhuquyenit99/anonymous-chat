import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import './style.scss';
import { getClient } from '../../client';
import { UserContext, PrivateChannelContext } from '../../context';

type UserItemType = {
    username: string;
    userId: string;
}

export function UserItem({ username, userId }: UserItemType) {
    const user = useContext(UserContext);
    let privateChannel = useContext(PrivateChannelContext);

    const [lastestMessage, setLastestMessage] = useState({ content: '', read: false, time: '' });
    const chatTopic = `/${[user.userId, userId].sort().join('')}`;

    useEffect(() => {
        console.log(chatTopic);
        let newPrivateChannel = { topic: chatTopic, listMessage: [{ content: '', read: false, time: '' }] };
        privateChannel.push(newPrivateChannel);
        getClient().subscribe(chatTopic);
    });
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message');
                const mes = message.toString();
                let date = new Date();
                const time = date.getHours().toString() + ':' + date.getMinutes().toString();
                console.log(time);
                const lastestMes = { content: mes, read: false, time: time };
                const index = privateChannel.findIndex((item) => item.topic === chatTopic);
                privateChannel[index].listMessage.push(lastestMes);
                console.log(privateChannel[index]);
                setLastestMessage(lastestMes);
            }
        });
    }, [chatTopic, privateChannel]);
    return (
        <div key={userId} className='user-item'>
            <div className='avatar'>
                <img src={avatar} alt='avatar' />
            </div>
            <div className='item-content'>
                <h5 className="item-name">{username}</h5>
                <p className={`lastest-message ${!lastestMessage.read ? 'unread' : ''}`}>{lastestMessage.content}</p>
            </div>
            <p className='extra'>{lastestMessage.time}</p>
        </div>
    );
}