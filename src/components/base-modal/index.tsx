import React from 'react';
import './style.scss';
import btnCancel from 'assets/images/btn-cancel.svg';

type BaseModalType = {
    title: string
    visible: boolean
    children: any
    modalClose: () => void
}

export function BaseModal(
    { title, children, visible, modalClose }: BaseModalType
) {
    return (
        <>
            <div
                className='modal'
                style={{
                    transform: visible ? 'translateY(0)' : 'translateY(-100vh',
                    opacity: visible ? '1' : '0',
                }}
            >
                <div className='modal-header'>
                    <p className='title'>{title}</p>
                    <button onClick={modalClose}><img src={btnCancel} alt='Cancel' /></button>
                </div>
                {children}
            </div>
            {visible && <div className='backdrop' onClick={modalClose} />}
        </>
    );
}