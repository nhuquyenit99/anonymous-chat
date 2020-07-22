import React, { useContext, useEffect, useState } from 'react';
import avatar from 'assets/images/avatar.svg';
import '../style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { UserModel, GroupType } from 'models';
import { Link } from 'react-router-dom';


export function GroupItem({ data }: { data: GroupType }) {
    console.log('UserItem data: ', data);
    const userContext = useContext(UserContext);
    let listMessageContext = useContext(ListMessageContext);
    const [lastestMessage, setLastestMessage] = useState({ userId: '', username: '', content: '', read: false, time: '' });

    const chatTopic = `/group/${data.userId}`;
    console.log(chatTopic);
    useEffect(() => {
        getClient().subscribe(chatTopic);
        const listPrivateMessage = listMessageContext.allListMessage.find(list => list.topic === chatTopic)?.listMessage;
        if (listPrivateMessage) {
            setLastestMessage(listPrivateMessage[listPrivateMessage.length - 1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === chatTopic) {
                console.log('Receive message from group');
                const lastestMes = configMessage(message);
                setLastestMessage(lastestMes);
                if (lastestMes.userId !== userContext.userId) {
                    listMessageContext.addMessage(chatTopic, lastestMes);
                }
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
    const groupName = data.users.filter(item => item.userId !== userContext.userId).map(item => item.username).join(', ');
    return (
        <Link to={chatTopic} onClick={onClickHandler}>
            <div className='user-item'>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <div className='item-content'>
                    <h5 className="item-name">{groupName}</h5>
                    <p className={`lastest-message ${!lastestMessage.read ? 'unread' : ''}`}>{lastestMessage.content}</p>
                </div>
                <p className='extra'>{lastestMessage.time}</p>
            </div>
        </Link>
    );
}