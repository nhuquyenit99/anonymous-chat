import React, { useContext, useEffect } from 'react';
import { BasePanel, BaseList } from 'components';
import { UserItem } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { UserModel, FavoriteType } from 'models';
import { getClient } from 'client';
import { PublicItem } from 'modules/chat-room/components';
import './style.scss';

export function ActiveUserPanel() {
    console.log('render ActiveUserPanel');
    const userContext = useContext(UserContext);

    //const [activeUsers, setActiveUsers] = useState(Object.values(userContext.activeUsers));

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
        userContext.clearActiveUsers();
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
            userContext.addActiveUser(activeUserInfo);
            console.log('list active users: ', userContext.activeUsers);
            //setActiveUsers(Object.values(userContext.activeUsers));
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
                activeUsers={Object.keys(userContext.activeUsers).length} />
            {Object.values(userContext.favoriteUsers).length !== 0 && (
                <div>
                    <p className='title'>{`Favorite Users (${Object.values(userContext.favoriteUsers).length})`}</p>
                    <BaseList<FavoriteType> data={Object.values(userContext.favoriteUsers)} Item={UserItem} />
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