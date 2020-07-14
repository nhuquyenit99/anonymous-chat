import React from 'react';
const userId = Math.random().toString().substring(2);

export const UserContext = React.createContext({
    auth: false,
    userId: userId,
});
