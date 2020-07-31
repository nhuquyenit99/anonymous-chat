import React, { useContext, useRef } from 'react';
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

    const scrollToBottom = () => {
        const scrollHeight = messagesEndRef.current.scrollHeight;
        const height = messagesEndRef.current.clientHeight;
        const maxScrollTop = scrollHeight + height;
        messagesEndRef.current.scrollTop = maxScrollTop;
        console.log('messagesEndRef', messagesEndRef.current);
    };

    const listMessageContext = useContext(ListMessageContext);
    const listMes = listMessageContext.allListMessage.find(list => list.topic === topic)?.listMessage;

    return (
        <div className='conversation-box'>
            <ConversationHeader user={userInfo} />
            <div className='conversation-message' ref={messagesEndRef} >
                <ConversationMessage data={listMes || []} />
            </div>
            {(!userContext.auth) ? <p className='noti'>Please edit your name to be able to chat here!</p> :
                <ConversationInput topic={topic} scrollToBottom={scrollToBottom} />}
        </div>
    );
}