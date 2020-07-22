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
    console.log('render PublicItem');

    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);

    const publicListMes = listMessageContext.allListMessage[0].listMessage;
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
                setLastestMessage(lastestMes);
                console.log('lastestMes.userId !== userContext.userId', lastestMes.userId, userContext.userId, lastestMes.userId !== userContext.userId);

                if (lastestMes.userId !== userContext.userId) {
                    listMessageContext.addMessage('/public', lastestMes);
                }
                console.log('list public message', listMessageContext.allListMessage[0]);
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
            read: userSendId === userContext.userId ? true : false,
            time: getTime()
        };
    };
    const getTime = () => {
        let date = new Date();
        let hour = date.getHours().toString();
        if (hour.length === 1) hour = '0' + hour;
        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = '0' + minute;
        return hour + ':' + minute;
    };

    const onClickHandler = (e: any) => {
        document.querySelector('.active')?.classList.remove('active');
        let element = e.target;
        while (!element.classList.contains('user-item')) {
            element = element.parentNode;
        }
        element.classList.add('active');
    };

    return (
        <Link to="/" onClick={onClickHandler}>
            <div className='user-item blue-bg active'>
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
