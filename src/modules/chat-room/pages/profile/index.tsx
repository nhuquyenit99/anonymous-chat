import React from 'react';
import { UserInfoPanel } from 'modules/chat-room/components';
import '../style.scss';
export function ProfilePage() {
    //let { slug } = useParams();

    return (
        <div className='body'>
            <UserInfoPanel />
        </div>
    );
}
