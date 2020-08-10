import React from 'react';
import { MessageType } from 'models';
import { BaseList } from 'components';
import { MessageItem } from './message-item';

type ConversationMessageType = {
    data: Array<MessageType>
}

export function ConversationMessage({ data }: ConversationMessageType) {
    return (
        <BaseList<MessageType> data={data} Item={MessageItem} className="list-mes-chat" />
    );
}