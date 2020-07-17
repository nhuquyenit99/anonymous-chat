import React, { useContext } from 'react';
import { ConversationHeader } from '../conversation-header';
import { ConversationMessage } from '../conversation-message';
import { ConversationInput } from '../conversation-input';
import { UserContext, ListMessageContext } from 'context';
import './style.scss';
import { UserModel } from 'models';

type ConversationBoxType = {
    topic: any
    userInfo: UserModel
}

export function ConversationBox({ topic, userInfo }: ConversationBoxType) {
    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);
    const listMes = listMessageContext.allListMessage.find(list => list.topic === topic)?.listMessage;
    return (
        <div className='conversation-box'>
            <ConversationHeader user={userInfo} />
            {/* <div className='conversation-message'> */}
            <ConversationMessage data={listMes ? listMes : []} />
            {/* </div> */}

            <ConversationInput topic={topic} />
        </div>
    );
}