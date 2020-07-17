import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { UserModel } from 'models';
import { Link } from 'react-router-dom';

export function UserItem({ data }: { data: UserModel }) {
    const user = useContext(UserContext);
    let listMessageContext = useContext(ListMessageContext);
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '' });
    const chatTopic = `/${[user.userId, data.userId].sort().join('')}`;

    useEffect(() => {
        console.log(chatTopic);
        getClient().subscribe(chatTopic);
        const listPrivateMessage = listMessageContext.listMessage.chatTopic;
        if (listPrivateMessage) {
            setLastestMessage(listPrivateMessage[listPrivateMessage.length - 1]);
        }
    }, [chatTopic, listMessageContext.listMessage.chatTopic]);
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message');
                const lastestMes = configMessage(message);
                setLastestMessage(lastestMes);
                listMessageContext.listMessage.chatTopic.push(lastestMes);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const configMessage = (message: any) => {
        const mesArray = message.toString().split(',');
        const userSendId = mesArray[0];
        const userSendName = mesArray[1];
        const mesContent = mesArray[2];
        return {
            userId: userSendId,
            username: userSendName,
            content: mesContent,
            read: userSendId === user.userId ? true : false,
            time: getTime()
        };
    };
    const getTime = () => {
        let date = new Date();
        return date.getHours().toString() + ':' + date.getMinutes().toString();
    };
    return (
        <Link to={`/${chatTopic}`}>
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
        </Link>
    );
}