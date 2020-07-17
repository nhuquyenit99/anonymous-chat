import React, { useState, useEffect, useContext } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { ListMessageContext, UserContext } from 'context';
import { getClient } from 'client';
import { Link } from 'react-router-dom';

type PublicItemType = {
    activeUsers: number;
}
export function PublicItem({ activeUsers }: PublicItemType) {
    const user = useContext(UserContext);
    console.log('render PublicItem');
    const listMessageContext = useContext(ListMessageContext);

    const publicListMes = listMessageContext.listMessage['/public'];
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '' });

    useEffect(() => {
        getClient().subscribe('public');
        if (publicListMes.length !== 0) {
            setLastestMessage(publicListMes[publicListMes.length - 1]);
        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/public') {
                console.log('Receive message');
                const lastestMes = configMessage(message);
                publicListMes.push(lastestMes);
                setLastestMessage(lastestMes);
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
        <Link to="/">
            <div className='user-item blue-bg'>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">PUBLIC</h5>
                    <p className={`lastest-message ${!lastestMessage.read && 'unread'}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{activeUsers} Users</p>
            </div>
        </Link>
    );
}
