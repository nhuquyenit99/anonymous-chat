import React from 'react';
import './style.scss';
import gif from 'assets/images/Loading Screen 5_5 - Ducks.gif';
export function Loading() {
    return (
        <div className='loading'>
            <div className='gif'>
                <img src={gif} alt="Loading..." />
            </div>
            <p>Please wait for a minute.</p>
        </div>
    );
}