import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { GroupType } from 'models';
import { Link, useHistory } from 'react-router-dom';
import { getConfigMessage } from 'config';


export function GroupItem({ data }: { data: GroupType }) {
    console.log('UserItem data: ', data);
    const history = useHistory();
    const userContext = useContext(UserContext);
    const [isActive, setIsActive] = useState(false);
    let listMessageContext = useContext(ListMessageContext);
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '', key: '' });

    const chatTopic = `/group/${data.userId}`;
    console.log(chatTopic);
    useEffect(() => {
        const path = history.location.pathname;
        if (path === chatTopic) {
            setIsActive(true);
        }
        getClient().subscribe(chatTopic);
        const listPrivateMessage = listMessageContext.allListMessage.find(list => list.topic === chatTopic)?.listMessage;
        if (listPrivateMessage) {
            setLastestMessage(listPrivateMessage[listPrivateMessage.length - 1]);
        }
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message from group');
                const path = history.location.pathname;
                if (path !== chatTopic) {
                    setIsActive(false);
                }
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

    const onClickHandler = (e: any) => {
        document.querySelector('.active')?.classList.remove('active');
        let element = e.target;
        while (!element.classList.contains('user-item')) {
            element = element.parentNode;
        }
        element.classList.add('active');
        setIsActive(true);
    };
    const groupName = data.users.filter(item => item.userId !== userContext.userId).map(item => item.username).join(', ');
    return (
        <Link to={chatTopic} onClick={onClickHandler}>
            <div className={`user-item ${isActive ? 'active' : ''}`}>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">{groupName}</h5>
                    <p className={`lastest-message ${(!lastestMessage.read && !isActive) ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{lastestMessage.time}</p>
            </div>
        </Link>
    );
}