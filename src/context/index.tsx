import React from 'react';
import { UserModel } from 'models';
const userId = Math.random().toString().substring(2);

type MessageType = {
    userId: string;
    username: string;
    content: string;
    read: boolean;
    time: string;
}
type ListMessageType = {
    listMessage: Record<string, Array<MessageType>>;
}

type UserContextType = {
    auth: boolean,
    userId: string,
    username: string,
    activeUsers: Record<string, UserModel>
}

export const UserContext = React.createContext<UserContextType>({
    auth: false,
    userId: userId,
    username: 'Username',
    activeUsers: {}
});


export const ListMessageContext = React.createContext<ListMessageType>({
    listMessage: {
        '/public': []
    }
});