import React, { useContext, useRef, useEffect } from 'react';
import { ConversationHeader, ConversationInput, ConversationMessage } from 'modules/chat-room/components';
import { ListMessageContext, UserContext } from 'context';
import { UserModel } from 'models';

import './style.scss';

type Props = {
    topic: any
    userInfo: UserModel
}

export function ConversationBox({ topic, userInfo }: Props) {
    const userContext = useContext(UserContext);
    const messagesEndRef: any = useRef();

    useEffect(() => {
        console.log('scrollToEnd...');
        scrollToEnd();

    });

    const scrollToEnd = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const listMessageContext = useContext(ListMessageContext);
    const listMes = listMessageContext.allListMessage.find(list => list.topic === topic)?.listMessage;

    return (
        <div className='conversation-box'>
            <ConversationHeader user={userInfo} />
            <div className='conversation-message' >
                <ConversationMessage data={listMes || []} />
                <div ref={messagesEndRef} />
            </div>
            {(!userContext.auth) ? <p className='noti'>Please edit your name to be able to chat here!</p> :
                <ConversationInput topic={topic} />}
        </div>
    );
}