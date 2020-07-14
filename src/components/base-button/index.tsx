import React from 'react';
import './style.scss';

type BaseButtonType = {
    btnType: string;
    clicked: any;
    btnName: string;
}

export function BaseButton({ btnType, clicked, btnName }: BaseButtonType) {
    return (
        <button className={btnType} onClick={clicked}>{btnName}</button>
    );
}