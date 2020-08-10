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

export type GroupType = {
    userId: string
    users: Array<UserModel>
}

export type UserItemType = {
    userId: string
    username: string
    pathName: string
    changePath: (path: string) => void
}

export type GroupItemType = {
    userId: string
    users: Array<UserModel>
    pathName: string
    changePath: (path: string) => void
}
