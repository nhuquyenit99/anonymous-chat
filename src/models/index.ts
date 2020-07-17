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
