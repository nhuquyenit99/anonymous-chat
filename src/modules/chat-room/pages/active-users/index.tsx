import React from 'react';
import { ActiveUserPanel } from 'modules/chat-room/components';
import '../style.scss';
export function ActiveUsersPage() {
    return (
        <div className='body'>
            <ActiveUserPanel />
        </div>
    );
}
