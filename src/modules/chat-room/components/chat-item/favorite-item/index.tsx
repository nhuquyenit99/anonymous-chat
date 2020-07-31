import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { Link, useHistory } from 'react-router-dom';
import { getConfigMessage } from 'config';

type UserItemType = {
    userId: string
    username: string
}

export function FavoriteItem({ data }: { data: UserItemType }) {
    console.log('UserItem data: ', data);

    const history = useHistory();

    const userContext = useContext(UserContext);
    let listMessageContext = useContext(ListMessageContext);

    const [isActive, setIsActive] = useState(false);
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '' });

    const chatTopic = `/${[userContext.userId, data.userId].sort().join('')}`;
    console.log(chatTopic);

    useEffect(() => {
        const path = history.location.pathname;
        if (path === `/group${chatTopic}`) {
            setIsActive(true);
        }
        getClient().subscribe(chatTopic);
        const listPrivateMessage = listMessageContext.allListMessage.find(list => list.topic === chatTopic)?.listMessage;
        if (listPrivateMessage && listPrivateMessage.length !== 0) {
            setLastestMessage(listPrivateMessage[listPrivateMessage.length - 1]);

        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message from favorite user');
                const path = history.location.pathname;
                if (path !== `/group${chatTopic}`) {
                    setIsActive(false);
                }
                const lastestMes = getConfigMessage(message);

                setLastestMessage(lastestMes);
            }
        });
        return () => {
            getClient().unsubscribe(chatTopic);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickHandler = (e: any) => {
        document.querySelector('.active')?.classList.remove('active');
        let element = e.target;
        while (!element.classList.contains('user-item')) {
            element = element.parentNode;
        }
        element.classList.add('active');
        setIsActive(true);
    };
    return (
        <Link to={`/favorite${chatTopic}`} onClick={onClickHandler}>
            <div className={`user-item ${isActive ? 'active' : ''}`}>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">{data.username}</h5>
                    <p className={`lastest-message ${(!lastestMessage.read && !isActive) ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{lastestMessage.time}</p>
            </div>
        </Link>
    );
}