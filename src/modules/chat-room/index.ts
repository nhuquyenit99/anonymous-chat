import { Module } from 'core';
import { ChatRoomPage, ProfilePage, PrivateChatRoom, FavoriteChatRoom } from './pages';

export function setup(module: Module) {
    console.log('Setup chat room');
    module.route({
        path: '/',
        exact: true,
        component: ChatRoomPage,
    });
    module.route({
        path: '/:topic',
        exact: true,
        component: PrivateChatRoom,
    });
    module.route({
        path: '/favorite/:topic',
        exact: false,
        component: FavoriteChatRoom,
    });
    module.route({
        path: '/profile',
        exact: false,
        component: ProfilePage,
    });
}
