import React, { useState, useContext } from 'react';
import btnSend from 'assets/images/Send-button.svg';
import './style.scss';
import { getClient } from 'client';
import { UserContext } from 'context';

type ConversationInputType = {
    topic: string;
}

export function ConversationInput({ topic }: ConversationInputType) {
    const userContext = useContext(UserContext);
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = () => {
        console.log('sending message...');
        if (messageToSend) {
            console.log(messageToSend);
            getClient().publish(topic, configMessage(messageToSend));
            setMessageToSend('');
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
    const configMessage = (message: string) => {
        return [userContext.userId, userContext.username, message].join(',');
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