import { Module } from 'core';
import { ChatRoomPage, ProfilePage, SettingPage } from './pages';

export function setup(module: Module) {
    console.log('Setup chat room');
    module.route({
        path: '/',
        exact: true,
        component: ChatRoomPage
    });
    module.route({
        path: '/profile',
        exact: true,
        component: ProfilePage
    });
    module.route({
        path: '/setting',
        exact: true,
        component: SettingPage
    });
}