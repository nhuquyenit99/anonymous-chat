import React from 'react';
import { MessageType } from 'models';
import { BaseList } from 'components';
import { MessageItem } from './message-item';

export function ConversationMessage({ data }: { data: Array<MessageType> }) {
    return (
        <BaseList<MessageType> data={data} Item={MessageItem} className='justify-bottom' />
    );
}