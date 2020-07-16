import { type } from 'os';

export type UserModel = {
    id: string;
    username: string;
};
export type MinimalItemData = { id: string };

export type MessageType = {
    userId: string;
    username: string;
    content: string;
    read: boolean;
    time: string;
}