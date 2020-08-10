import React from 'react';
import { NavBar, Footer } from 'components';
import './style.scss';
import { ActiveUserPanel, UserInfoPanel } from 'modules/chat-room/components';

export function AppWrapper({ children }: any) {
    return (
        <div className="app-wrap">
            <NavBar />
            <div className="body">
                <div className='left-panel'>
                    <ActiveUserPanel />
                </div>
                {children}
                <div className='user-info'>
                    <UserInfoPanel />
                </div>
            </div>

            <Footer />
        </div>
    );
}
