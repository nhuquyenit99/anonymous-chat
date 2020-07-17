import React from 'react';
import { UserModel } from 'models';


type FavoriteContextType = {
    listFavorite: Array<UserModel>;
}

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
    auth: boolean
    userId: string
    username: string
    activeUsers: Record<string, UserModel>
    addActiveUser: (u: UserModel) => void
    authenticated: () => void
    updateUser: (u: any) => void
}

export const UserContext = React.createContext<UserContextType>({
    auth: false,
    userId: 'userId',
    username: 'Username',
    activeUsers: {},
    addActiveUser: (u: UserModel) => undefined,
    authenticated: () => undefined,
    updateUser: (u: any) => undefined
});

export class UserContextProvider extends React.Component<any, any> {
    state = {
        auth: false,
        userId: 'userId',
        username: 'Username',
        activeUsers: {}
    }

    authenticated = () => {
        this.setState({ auth: true });
    }

    logout = () => {
        this.setState({ auth: false });
    }

    addActiveUser = (user: UserModel) => {
        this.setState((prev: any) => {
            return {
                activeUsers: {
                    ...prev.activeUsers,
                    [user.userId]: user
                }
            };
        });
    }

    updateUser = (user: any) => {
        this.setState({
            userId: user.userId,
            username: user.username,
        });
    }

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                addActiveUser: this.addActiveUser,
                authenticated: this.authenticated,
                updateUser: this.updateUser
            }}>
                {this.props.children}
            </UserContext.Provider >
        );
    }
}


export const ListMessageContext = React.createContext<ListMessageType>({
    listMessage: {
        '/public': []
    }
});

export const FavoriteContext = React.createContext<FavoriteContextType>({
    listFavorite: []
});