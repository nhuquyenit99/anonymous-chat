import React, { useState, useEffect, useContext } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { ListMessageContext, UserContext } from 'context';
import { getClient } from 'client';
import { Link, useHistory } from 'react-router-dom';
import { getConfigMessage } from 'config';

type PublicItemType = {
    activeUsers: number;
}
export function PublicItem({ activeUsers }: PublicItemType) {
    console.log('render PublicItem');
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);

    const publicListMes = listMessageContext.allListMessage[0].listMessage;
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '', key: '' });

    useEffect(() => {
        if (history.location.pathname === '/') {
            setIsActive(true);
        }
        getClient().subscribe('public');
        if (publicListMes.length !== 0) {
            setLastestMessage(publicListMes[publicListMes.length - 1]);
        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/public') {
                console.log('Receive message');
                if (history.location.pathname !== '/') {
                    setIsActive(false);
                }

                const lastestMes = getConfigMessage(message);
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
    const onClickHandler = (e: any) => {
        document.querySelector('.active')?.classList.remove('active');
        let element = e.target;
        while (!element.classList.contains('user-item')) {
            element = element.parentNode;
        }
        element.classList.add('active');

        if (isActive === false) setIsActive(true);
    };

    return (
        <Link to="/" onClick={onClickHandler}>
            <div className={`user-item blue-bg ${isActive ? 'active' : ''}`}>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">PUBLIC</h5>
                    <p className={`lastest-message ${(!lastestMessage.read && !isActive) ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{activeUsers} Users</p>
            </div>
        </Link>
    );
}
