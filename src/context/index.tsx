import React from "react";
const userId = Math.random().toString().substring(2);

export const UserIdContext = React.createContext(userId);
