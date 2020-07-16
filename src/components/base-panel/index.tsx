import React from 'react';
import './style.scss';

type BasePanelProps = {
    title: string;
    children: any;
    className?: string;
};

export function BasePanel({ title, children, className }: BasePanelProps) {
    return (
        <div className={['base-panel', className].join(' ')}>
            <p className="panel-title">{title}</p>
            <div className="panel-body">{children}</div>
        </div>
    );
}
