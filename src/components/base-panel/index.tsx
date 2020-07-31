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
            <h3 className="panel-title">{title}</h3>
            <div className="panel-body">{children}</div>
        </div>
    );
}
