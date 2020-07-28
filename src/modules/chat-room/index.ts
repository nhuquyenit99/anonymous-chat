import { Module } from 'core';
import { ChatRoomPage, ProfilePage, PrivateChatRoom, FavoriteChatRoom, GroupChatRoom, ActiveUsersPage } from './pages';

export function setup(module: Module) {
    console.log('Setup chat room');
    module.route({
        path: '/',
        exact: true,
        component: ChatRoomPage,
    });
    module.route({
        path: '/active/:topic',
        exact: true,
        component: PrivateChatRoom,
    });
    module.route({
        path: '/favorite/:topic',
        exact: true,
        component: FavoriteChatRoom,
    });
    module.route({
        path: '/group/:topic',
        exact: true,
        component: GroupChatRoom,
    });
    module.route({
        path: '/profile',
        exact: true,
        component: ProfilePage,
    });
    module.route({
        path: '/users',
        exact: false,
        component: ActiveUsersPage,
    });
}
