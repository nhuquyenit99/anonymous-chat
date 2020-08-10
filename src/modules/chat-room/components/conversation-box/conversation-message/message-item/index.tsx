import React, { useContext } from 'react';
import avatar from 'assets/images/avatar.svg';
import './style.scss';
import { MessageType } from 'models';
import { UserContext } from 'context';

export function MessageItem({ data }: { data: MessageType }) {
    const userContext = useContext(UserContext);
    return (
        <div
            className={`message-item ${data.userId === userContext.userId ? 'right' : ''}`}
            style={{ display: `${(data.userId === '') ? 'none' : 'flex'}` }}>
            {/* <div className='avatar'> */}
            <img className='avatar' src={avatar} alt='avatar' />
            {/* </div> */}
            <div className='item-content'>
                <div>
                    <h5 className="username">{data.username}</h5>
                    <div className='message'>{data.content}</div>
                </div>
                <p className='extra'>{data.time}</p>
            </div>
        </div >
    );
}