import React, { useContext } from 'react';
import { ConversationBox } from 'modules/chat-room/components';
import { UserContext } from 'context';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from 'components';

export function FavoriteChatRoom() {
    console.log('render PrivateChatRoom');
    const userContext = useContext(UserContext);
    let { topic } = useParams();
    let userId = topic.split(userContext.userId).find((item: string) => item !== '');
    console.log('Favorite userId: ', userId);

    // return (
    //     <ConversationBox topic={topic} userInfo={user} />
    // );
    if (userContext.favoriteUsers[userId]) {
        const userInfo = userContext.favoriteUsers[userId];
        const user = {
            userId: userInfo.userId,
            username: userInfo.username
        };
        return (
            <ConversationBox topic={topic} userInfo={user} />
        );
    }

    return (<NotFoundPage />);
}