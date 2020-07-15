import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './style.scss';

type BaseButtonType =  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    className?: string;
}

export function BaseButton({ className, children, ...rest }: React.PropsWithChildren<BaseButtonType>) {
    return (
        <button className={className} {...rest} >{children}</button>
    );
}