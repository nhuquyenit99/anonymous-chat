import { Module } from 'core';
import { ChatRoomPage, ProfilePage, PrivateChatRoom } from './pages';

export function setup(module: Module) {
    console.log('Setup chat room');
    module.route({
        path: '/',
        exact: true,
        component: ChatRoomPage,
    });
    module.route({
        path: '/:userId',
        exact: true,
        component: PrivateChatRoom,
    });
    module.route({
        path: '/favorite/:userId',
        exact: false,
        component: PrivateChatRoom,
    });
    module.route({
        path: '/profile',
        exact: false,
        component: ProfilePage,
    });
}
