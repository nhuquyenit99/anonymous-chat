import React from 'react';
const userId = Math.random().toString().substring(2);

export const UserContext = React.createContext({
    auth: false,
    userId: userId,
    username: 'Username'
});

export const PublicChannelContext = React.createContext({
    topic: '/public',
    activeUsers: [{ userId: userId, username: 'Username' }],
    listMessage: ['']
});

export const PrivateChannelContext = React.createContext([{ topic: '', listMessage: [{ content: '', read: false, time: '' }] }]);