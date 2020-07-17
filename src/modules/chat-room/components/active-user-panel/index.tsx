import React, { useContext, useState, useEffect } from 'react';
import { BasePanel, BaseList } from 'components';
import { UserItem } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { UserModel } from 'models';
import { getClient } from 'client';
import { PublicItem } from 'modules/chat-room/components';
import './style.scss';

export function ActiveUserPanel() {
    console.log('render ActiveUserPanel');
    const userContext = useContext(UserContext);

    const [activeUsers, setActiveUsers] = useState(Object.values(userContext.activeUsers));

    useEffect(() => {
        getClient().subscribe('/new_user');
        getClient().subscribe('/active_user');
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/new_user') {
                console.log('Have a new user: ', message.toString());
                sendInfo();
            }
            if (topic === '/active_user') {
                addActiveUser(message);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendInfo = () => {
        setActiveUsers([]);
        const userInfo = {
            userId: userContext.userId,
            username: userContext.username
        };
        const userInfoMes = JSON.stringify(userInfo);
        getClient().publish('/active_user', userInfoMes);
    };

    const addActiveUser = (message: any) => {
        const userInfoArray = message.toString().split('"');
        const activeUserInfo = {
            userId: userInfoArray[3],
            username: userInfoArray[7]
        };
        console.log('Active User: ', activeUserInfo);
        if (activeUserInfo.userId !== userContext.userId) {
            userContext.activeUsers[activeUserInfo.userId] = activeUserInfo;
            console.log('list active users: ', userContext.activeUsers);
            setActiveUsers(Object.values(userContext.activeUsers));
        }
    };

    useEffect(() => {
        setInterval(sendInfo, 60000);
        return () => {
        };
    });
    return (
        <BasePanel title='Chat list' className='blue-header-panel'>
            <PublicItem
                activeUsers={Object.keys(activeUsers).length} />
            {activeUsers && (
                <div>
                    <p className='title'>{`Active Users (${activeUsers.length})`}</p>
                    <BaseList<UserModel> data={activeUsers} Item={UserItem} />
                </div>
            )}
        </BasePanel>
    );
}