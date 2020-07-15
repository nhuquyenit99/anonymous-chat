import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import './style.scss';
import { getClient } from '../../client';
import { UserContext, ListMessageContext } from '../../context';
import { UserModel } from 'models';

export function UserItem({ data }: { data: UserModel }) {
    const user = useContext(UserContext);
    let listMessage = useContext(ListMessageContext);

    const [lastestMessage, setLastestMessage] = useState({ content: '', read: false, time: '' });
    const chatTopic = `/${[user.userId, data.userId].sort().join('')}`;

    useEffect(() => {
        console.log(chatTopic);
        let newPrivateChannel = { topic: chatTopic, listMessage: [{ content: '', read: false, time: '' }] };
        listMessage.push(newPrivateChannel);
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
                const index = listMessage.findIndex((item) => item.topic === chatTopic);
                listMessage[index].listMessage.push(lastestMes);
                console.log(listMessage[index]);
                setLastestMessage(lastestMes);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='user-item'>
            <div className='avatar'>
                <img src={avatar} alt='avatar' />
            </div>
            <div className='item-content'>
                <h5 className="item-name">{data.username}</h5>
                <p className={`lastest-message ${!lastestMessage.read ? 'unread' : ''}`}>{lastestMessage.content}</p>
            </div>
            <p className='extra'>{lastestMessage.time}</p>
        </div>
    );
}