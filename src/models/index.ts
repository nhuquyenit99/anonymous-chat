import { type } from 'os';

export type UserModel = {
    userId: string;
    username: string;
};
export type MinimalItemData = { userId: string };

export type MessageType = {
    userId: string;
    username: string;
    content: string;
    read: boolean;
    time: string;
}
export type FavoriteType = {
    userId: string
    username: string
    favorite: boolean
}

export type GroupType = {
    userId: string
    users: Array<UserModel>
}