import React, { useContext, useRef } from 'react';
import { ConversationHeader, ConversationInput, ConversationMessage } from 'modules/chat-room/components';
import { } from './conversation-message';
import { } from './conversation-input';
import { ListMessageContext } from 'context';
import './style.scss';
import { UserModel } from 'models';

type Props = {
    topic: any
    userInfo: UserModel
}

export function ConversationBox({ topic, userInfo }: Props) {
    const messagesEndRef: any = useRef();

    const scrollToBottom = () => {
        // messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
                {/* <div >Hello</div> */}
            </div>
            <ConversationInput topic={topic} scrollToBottom={scrollToBottom} />
        </div>
    );
}