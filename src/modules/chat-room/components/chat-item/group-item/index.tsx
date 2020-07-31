import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { GroupItemType } from 'models';
import { Link } from 'react-router-dom';
import { getConfigMessage } from 'config';


export function GroupItem({ data }: { data: GroupItemType }) {
    console.log('Render group item');

    const userContext = useContext(UserContext);

    let listMessageContext = useContext(ListMessageContext);
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '', key: '' });

    const chatTopic = `/group/${data.userId}`;
    useEffect(() => {
        getClient().subscribe(chatTopic);
        const listPrivateMessage = listMessageContext.allListMessage.find(list => list.topic === chatTopic)?.listMessage;
        if (listPrivateMessage) {
            setLastestMessage(listPrivateMessage[listPrivateMessage.length - 1]);
        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message from group');
                const lastestMes = getConfigMessage(message);
                setLastestMessage(lastestMes);
                if (lastestMes.userId !== userContext.userId) {
                    listMessageContext.addMessage(chatTopic, lastestMes);
                }
            }
        });
        return () => {
            getClient().unsubscribe(chatTopic);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const groupName = data.users.filter(item => item.userId !== userContext.userId).map(item => item.username).join(', ');
    return (
        <Link to={chatTopic} onClick={() => data.changePath(chatTopic)}>
            <div className={`user-item ${data.pathName === chatTopic ? 'active' : ''}`}>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">{groupName}</h5>
                    <p className={`lastest-message ${(!lastestMessage.read && data.pathName !== chatTopic) ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{lastestMessage.time}</p>
            </div>
        </Link>
    );
}