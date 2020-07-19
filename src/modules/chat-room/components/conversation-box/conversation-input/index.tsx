import React, { useState, useContext } from 'react';
import btnSend from 'assets/images/Send-button.svg';
import './style.scss';
import { getClient } from 'client';
import { UserContext, ListMessageContext } from 'context';

type ConversationInputType = {
    topic: string;
    scrollToBottom: () => void
}

export function ConversationInput({ topic, scrollToBottom }: ConversationInputType) {
    const userContext = useContext(UserContext);
    const listMessageContext = useContext(ListMessageContext);
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = () => {
        console.log('sending message...');
        if (messageToSend) {
            getClient().publish(topic, configMessageToSend(messageToSend));
            listMessageContext.addMessage(topic, configMessageToPush(messageToSend));
            setMessageToSend('');
            scrollToBottom();
        }
    };

    const keyDownHandler = (e: any) => {
        console.log('KeyDownHandler...');
        if (e.keyCode === 13) {
            sendMessage();
        }
    };
    const changeHandler = (e: any) => {
        setMessageToSend(e.target.value);
    };
    const configMessageToSend = (message: string) => {
        return [userContext.userId, userContext.username, message].join(',');
    };

    const configMessageToPush = (message: string) => {
        return {
            userId: userContext.userId,
            username: userContext.username,
            content: message,
            read: true,
            time: getTime()
        };
    };
    const getTime = () => {
        let date = new Date();
        let hour = date.getHours().toString();
        if (hour.length === 1) hour = '0' + hour;
        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = '0' + minute;
        return hour + ':' + minute;
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