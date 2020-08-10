import React, { useState, useEffect, useContext } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { ListMessageContext, UserContext } from 'context';
import { getClient } from 'client';
import { Link } from 'react-router-dom';
import { getConfigMessage } from 'config';

type PublicItemType = {
    activeUsers: number
    pathName: string
    changePath: (path: string) => void
}
export function PublicItem({ activeUsers, pathName, changePath }: PublicItemType) {
    console.log('render PublicItem');

    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);

    const publicListMes = listMessageContext.allListMessage[0].listMessage;
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '', key: '' });

    useEffect(() => {
        getClient().subscribe('public');
        if (publicListMes.length !== 0) {
            setLastestMessage(publicListMes[publicListMes.length - 1]);
        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/public') {
                console.log('Receive message in public room');

                const lastestMes = getConfigMessage(message);
                setLastestMessage(lastestMes);

                if (lastestMes.userId !== userContext.userId) {
                    listMessageContext.addMessage('/public', lastestMes);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Link to="/" onClick={() => changePath('/')}>
            <div className={`user-item blue-bg ${pathName === '/' ? 'active' : ''}`}>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">PUBLIC</h5>
                    <p className={`lastest-message ${(!lastestMessage.read && pathName !== '/') ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{activeUsers} Users</p>
            </div>
        </Link >
    );
}
