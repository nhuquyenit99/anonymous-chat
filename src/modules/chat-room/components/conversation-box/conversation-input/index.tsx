import React, { useState, useContext } from 'react';
import btnSend from 'assets/images/Send-button.svg';
import './style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';
import { getTime } from 'config';

type ConversationInputType = {
    topic: string;
}

export function ConversationInput({ topic }: ConversationInputType) {
    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = () => {
        console.log('sending message...');
        if (messageToSend) {
            getClient().publish(topic, configMessageToSend(messageToSend));
            listMessageContext.addMessage(topic, configMessageToPush(messageToSend));
            setMessageToSend('');
        }
    };

    const keyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    };
    const changeHandler = (e: any) => {
        setMessageToSend(e.target.value);
    };
    const configMessageToSend = (message: string) => {
        return [userContext.userId, userContext.username, message, `${userContext.userId}${Date.now()}`].join(',');
    };

    const configMessageToPush = (message: string) => {
        return {
            userId: userContext.userId,
            username: userContext.username,
            content: message,
            read: true,
            time: getTime(),
            key: `${userContext.userId}${Date.now()}`
        };
    };

    return (
        <div className="conversation-input">
            <input
                className="input-text"
                type='text' placeholder="Type here..."
                value={messageToSend}
                onChange={changeHandler}
                onKeyDown={keyDownHandler}
            />
            <img
                className="btn-send"
                src={btnSend} alt="btn-send"
                onClick={sendMessage} />
        </div>
    );
}