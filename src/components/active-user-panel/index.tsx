import React, { useContext, useState, useEffect } from 'react';
import { BasePanel, BaseList, UserItem } from 'components';
import { UserContext } from 'context';
import { UserModel } from 'models';
import { getClient } from 'client';
import { PublicItem } from 'components/user-item/public-item';
import './style.scss';

export function ActiveUserPanel() {
    console.log('render ActiveUserPanel');
    const userContext = useContext(UserContext);

    const [activeUsers, setActiveUsers] = useState(userContext.activeUsers);


    getClient().subscribe('/new_user');
    getClient().subscribe('/active_user');
    useEffect(() => {
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/new_user') {
                console.log('Have a new user: ', message.toString());
                userContext.activeUsers = [];
                let userInfo = {
                    userId: userContext.userId,
                    username: userContext.username
                };
                const userInfoMes = JSON.stringify(userInfo);
                getClient().publish('/active_user', userInfoMes);
                getClient().on('message', (topic: any, message: any) => {
                    console.log(message.toString());
                    const activeUserInfo = {
                        userId:
                            message.toString().split('"')[3],
                        username: message.toString().split('"')[7]
                    };
                    console.log('Active User: ', activeUserInfo);
                    if (topic === '/active_user') {
                        console.log('Active user:', JSON.parse(JSON.stringify((message.toString()))).username);
                        if (activeUserInfo.userId !== userContext.userId) {
                            userContext.activeUsers.push(activeUserInfo);
                            console.log('list active users: ', userContext.activeUsers);
                            setActiveUsers(userContext.activeUsers);
                        }
                    }
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <BasePanel title='Chat list' className='blue-header-panel'>
            <PublicItem
                activeUsers={activeUsers.length} />
            {activeUsers.length !== 0 && (
                <div>
                    <p className='title'>{`Active Users (${activeUsers.length})`}</p>
                    <BaseList<UserModel> data={activeUsers} Item={UserItem} />
                </div>
            )}
        </BasePanel>
    );
}