import React, { useState, useEffect, useContext } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { ListMessageContext, UserContext } from 'context';
import { getClient } from 'client';

type PublicItemType = {
    activeUsers: number;
}
export function PublicItem({ activeUsers }: PublicItemType) {
    console.log('render PublicItem');
    const listMessage = useContext(ListMessageContext);
    const user = useContext(UserContext);

    const publicListMes = listMessage[0].listMessage;

    const [lastestMessage, setLastestMessage] = useState(publicListMes[publicListMes.length - 1]);

    getClient().subscribe('public');
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/public') {
                console.log('Receive message');
                const mes = message.toString();
                let date = new Date();
                const time = date.getHours().toString() + ':' + date.getMinutes().toString();
                console.log(time);
                const lastestMes = { content: mes, read: false, time: time };
                publicListMes.push(lastestMes);
                console.log(publicListMes);
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
                <h5 className="item-name">PUBLIC</h5>
                <p className={`lastest-message ${!lastestMessage.read ? 'unread' : ''}`}>{lastestMessage.content}</p>
            </div>
            <p className='extra'>{activeUsers} Users</p>
        </div>
    );
}
