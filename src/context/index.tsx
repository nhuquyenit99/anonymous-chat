import React from 'react';
import { UserModel } from 'models';


type FavoriteContextType = {
    listFavorite: Array<UserModel>;
}

type GroupType = {
    chatId: string;
    users: Array<UserModel>
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
    favoriteUsers: Record<string, UserModel>
    groups: Record<string, GroupType>
    addActiveUser: (u: UserModel) => void
    authenticated: () => void
    updateUser: (u: any) => void
    addFavoriteUser: (u: any) => void
    removeFavoriteUser: (u: any) => void
}

export const UserContext = React.createContext<UserContextType>({
    auth: false,
    userId: 'userId',
    username: 'Username',
    activeUsers: {},
    favoriteUsers: {},
    groups: {},
    addActiveUser: (u: UserModel) => undefined,
    authenticated: () => undefined,
    updateUser: (u: any) => undefined,
    addFavoriteUser: (u: any) => undefined,
    removeFavoriteUser: (u: any) => undefined
});

export class UserContextProvider extends React.Component<any, any> {
    state = {
        auth: false,
        userId: 'userId',
        username: 'Username',
        activeUsers: {},
        favoriteUsers: {},
        groups: {}
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

    addFavoriteUser = (user: UserModel) => {
        console.log('Adding favorite user');
        this.setState((prev: any) => {
            return {
                favoriteUsers: {
                    ...prev.favoriteUsers,
                    [user.userId]: user
                }
            };
        });
    }

    removeFavoriteUser = (user: UserModel) => {
        this.setState((prev: any) => {
            delete prev.favoriteUsers[user.userId];
            return prev;
        });
    }

    addGroup = (users: Array<UserModel>) => {
    }

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                addActiveUser: this.addActiveUser,
                authenticated: this.authenticated,
                updateUser: this.updateUser,
                addFavoriteUser: this.addFavoriteUser,
                removeFavoriteUser: this.removeFavoriteUser
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