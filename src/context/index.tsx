import React from 'react';
const userId = Math.random().toString().substring(2);

export const UserContext = React.createContext({
    auth: false,
    userId: userId,
    username: 'Username',
    activeUsers: [{
        userId: '',
        username: ''
    }]
});

export const ListMessageContext = React.createContext([{ topic: '/public', listMessage: [{ content: '', read: true, time: '' }] }]);