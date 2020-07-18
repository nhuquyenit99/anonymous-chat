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
    userId: string
    username: string
    content: string
    read: boolean
    time: string
}

type UserContextType = {
    auth: boolean
    userId: string
    username: string
    userBio: string
    activeUsers: Record<string, UserModel>
    favoriteUsers: Record<string, UserModel>
    groups: Record<string, GroupType>
    addActiveUser: (u: UserModel) => void
    authenticated: () => void
    updateUser: (u: any) => void
    addFavoriteUser: (u: any) => void
    removeFavoriteUser: (u: any) => void
    clearActiveUsers: () => void
    updateAllInfo: (info: StateType) => void
}

export const UserContext = React.createContext<UserContextType>({
    auth: false,
    userId: 'userId',
    username: 'Username',
    userBio: 'Life as a beautiful flower.',
    activeUsers: {},
    favoriteUsers: {},
    groups: {},
    addActiveUser: (u: UserModel) => undefined,
    authenticated: () => undefined,
    updateUser: (u: any) => undefined,
    addFavoriteUser: (u: any) => undefined,
    removeFavoriteUser: (u: any) => undefined,
    clearActiveUsers: () => undefined,
    updateAllInfo: (info: StateType) => undefined
});

type StateType = {
    auth: boolean
    userId: string
    username: string
    userBio: string
    activeUsers: Record<string, UserModel>
    favoriteUsers: Record<string, UserModel>
    groups: Record<string, GroupType>
}

export class UserContextProvider extends React.Component<any, StateType> {
    constructor(props: any) {
        super(props);
        const userInfoString = localStorage.getItem('user-info');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            this.state = userInfo;
        }
        else {
            this.state = {
                auth: false,
                userId: Math.random().toString().substring(2),
                username: 'Username',
                userBio: 'Life as a beautiful flower.',
                activeUsers: {},
                favoriteUsers: {},
                groups: {}
            };
        }
        console.log(this.state);
    }


    authenticated = () => {
        this.setState({ auth: true }, this.saveData);
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
        }, this.saveData);
    }

    updateUser = (user: any) => {
        this.setState({
            username: user.username
        }, this.saveData);
        this.setState({
            userBio: user.userBio
        }, this.saveData);
    };

    updateAllInfo = (info: StateType) => {
        this.setState(info, () => {
            console.log(this.state);
        });
    }
    clearActiveUsers = () => {
        this.setState({ activeUsers: {} }, this.saveData);
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
        }, this.saveData);
    }

    removeFavoriteUser = (user: UserModel) => {
        this.setState((prev: any) => {
            delete prev.favoriteUsers[user.userId];
            return prev;
        }, this.saveData);
    }

    addGroup = (users: Array<UserModel>) => {
    }

    saveData = () => {
        localStorage.setItem('user-info', JSON.stringify(this.state));
    }

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                addActiveUser: this.addActiveUser,
                authenticated: this.authenticated,
                updateUser: this.updateUser,
                addFavoriteUser: this.addFavoriteUser,
                removeFavoriteUser: this.removeFavoriteUser,
                clearActiveUsers: this.clearActiveUsers,
                updateAllInfo: this.updateAllInfo
            }}>
                {this.props.children}
            </UserContext.Provider >
        );
    }
}

type ListMessageType = {
    topic: string
    listMessage: Array<MessageType>
}
type ListMessageContextType = {
    allListMessage: Array<ListMessageType>
    addMessage: (topic: string, mes: MessageType) => void
}

export const ListMessageContext = React.createContext<ListMessageContextType>({
    allListMessage: [],
    addMessage: (topic: string, mes: MessageType) => undefined
});

export class ListMessageContextProvider extends React.Component<any, any> {

    state = {
        allListMessage: [
            { topic: '/public', listMessage: [{ userId: '', username: '', content: '', read: false, time: '' }] }
        ]
    }

    addMessage = (topic: string, mes: MessageType) => {
        const listMesIndex = this.state.allListMessage.findIndex(list => list.topic === topic);
        let allList = this.state.allListMessage;
        if (listMesIndex === -1) {
            const newListMes = { topic: topic, listMessage: [mes] };
            allList.push(newListMes);
        } else {
            allList[listMesIndex].listMessage.push(mes);
        }
        this.setState(allList);
    }
    render() {
        return (
            <ListMessageContext.Provider
                value={{
                    ...this.state,
                    addMessage: this.addMessage
                }}
            >
                {this.props.children}
            </ListMessageContext.Provider>
        );
    }
}
