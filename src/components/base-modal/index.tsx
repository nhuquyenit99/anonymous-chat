import React from 'react';
import 'antd/dist/antd.css';
import './style.scss';

import { Modal } from 'antd';


type MinimalItemData = { id: string };

interface baseModalProps<T extends MinimalItemData = MinimalItemData> {
    data: Array<T>;
    Item: React.ComponentType<{ data: T }>;
    handleAddMember?: Function;
    handleShow?: any
    handleClose?: any
    className?: any
}

export function BaseModal<T extends MinimalItemData = MinimalItemData>({
    data,
    Item,
    handleAddMember,
    handleShow,
    handleClose,
    className
}: baseModalProps<T>) {

    function renderItem() {
        return data.map((item) => {
            return (<div className="item" key={item.id}>
                <Item data={item} key={item.id} />
                <button className="add-button">Add</button>
            </div>);
        });
    }

    return (
        <div className={['base-modal', className].join(' ')}>
            <div>
                <Modal
                    title="Add"
                    visible={handleShow}
                    onCancel={handleClose}
                >
                    <div className="modal-body">
                        <div className="modal-search">
                            <input type="text" placeholder="Search ..." />
                        </div>
                        <div className="modal-add">
                            {renderItem()}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
