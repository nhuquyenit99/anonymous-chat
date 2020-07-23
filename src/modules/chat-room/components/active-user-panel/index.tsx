import React, { useContext, useEffect } from 'react';
import { BasePanel, BaseList } from 'components';
import { UserContext } from 'context';
import { UserModel, GroupType } from 'models';
import { getClient } from 'client';
import { PublicItem, UserItem, GroupItem } from 'modules/chat-room/components';
import './style.scss';
import { FavoriteItem } from '../chat-item/favorite-item';
import { useHistory } from 'react-router-dom';

export function ActiveUserPanel() {
    console.log('render ActiveUserPanel');
    const userContext = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getClient().subscribe('/new_user');
        getClient().subscribe('/active_user');
        getClient().subscribe('/user_out');

        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/new_user') {
                console.log('Have a new user: ', message.toString());
                addActiveUser(message);
                sendInfo();
            }
            if (topic === '/active_user') {
                addActiveUser(message);
            }
            if (topic === '/user_out') {
                console.log('Have a user out :', message.toString());
                removeActiveUser(message);
            }

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getClient().subscribe('/group');
        getClient().on('message', (topic: any, message: any) => {
            if (topic === '/group') {
                console.log('New group: ', configGroupContent(message));
                alert('You have a new group!');
                const usersInGroup = configGroupContent(message);
                for (let user of usersInGroup) {
                    if (user.userId === userContext.userId) {
                        userContext.addGroup(usersInGroup);
                        console.log(userContext.groups);
                    }
                }
                history.push(`/group/${[...usersInGroup.map(user => user.userId)].sort().join('')}`);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const configGroupContent = (message: any) => {
        const messageSplitted = message.toString().split('"');

        const user1 = { userId: messageSplitted[3], username: messageSplitted[7] };
        let users = [user1];
        for (let i = 9; i < messageSplitted.length; i += 8) {
            const user = { userId: messageSplitted[i + 2], username: messageSplitted[i + 6] };
            users.push(user);
        }
        return users;
    };

    const sendInfo = () => {
        const userInfo = {
            userId: userContext.userId,
            username: userContext.username
        };
        const userInfoMes = JSON.stringify(userInfo);
        getClient().publish('/active_user', userInfoMes);
    };

    const addActiveUser = (message: any) => {
        const activeUserInfo = convertMessageToObject(message);
        if (activeUserInfo.userId !== userContext.userId) {
            userContext.addActiveUser(activeUserInfo);
            console.log('list active users: ', userContext.activeUsers);
        }
    };

    const convertMessageToObject = (message: any) => {
        const userInfoArray = message.toString().split('"');
        const activeUserInfo = {
            userId: userInfoArray[3],
            username: userInfoArray[7]
        };
        return activeUserInfo;
    };

    const removeActiveUser = (message: any) => {
        userContext.removeActiveUser(convertMessageToObject(message));
        console.log('list active users: ', userContext.activeUsers);
    };

    return (
        <BasePanel title='Chat list' className='blue-header-panel'>
            <PublicItem
                activeUsers={Object.keys(userContext.activeUsers).length} />
            {Object.values(userContext.favoriteUsers).length !== 0 && (
                <div>
                    <p className='title'>{`Favorite Users (${Object.values(userContext.favoriteUsers).length})`}</p>
                    <BaseList<UserModel> data={Object.values(userContext.favoriteUsers)} Item={FavoriteItem} />
                </div>
            )}
            {Object.values(userContext.groups).length !== 0 && (
                <div>
                    <p className='title'>{`Groups (${Object.values(userContext.groups).length})`}</p>
                    <BaseList<GroupType> data={Object.values(userContext.groups)} Item={GroupItem} />
                </div>
            )}
            {userContext.activeUsers && (
                <div>
                    <p className='title'>{`Active Users (${Object.values(userContext.activeUsers).length})`}</p>
                    <BaseList<UserModel> data={Object.values(userContext.activeUsers)} Item={UserItem} />
                </div>
            )}
        </BasePanel>
    );
}