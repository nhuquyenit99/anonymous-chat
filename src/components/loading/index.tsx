import React from 'react';
import './style.scss';
import gif from 'assets/images/cool-loading-animated-gif-1.gif';
export function Loading() {
    return (
        <div className='loading'>
            <h2>Welcome to Anonymous Chat!</h2>
            <div className='gif'>
                <img src={gif} alt="Loading..." />
            </div>
            <p>Please wait for a minute...</p>
        </div>
    );
}