import React, { useState, useContext } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getConfig } from 'config';
import avatar from 'assets/images/avatar.svg';
import './style.scss';
import { UserContext } from 'context';

export function NavBar() {
    const [show, showMenu] = useState(false);
    return (
        <>
            <div className={`nav-bar ${show && 'nav-open'}`}>
                <Link to="/" className='logo'>
                    <div className="branch-name">
                        {`${getConfig('BRANCH_NAME')}`}
                        <MenuOutlined className="menu-toggle" onClick={() => showMenu(state => !state)} />
                    </div>
                </Link>
                <div className="nav-item" onClick={() => showMenu(state => !state)}>
                    <Link to="/users">
                        Chat List
                    </Link>
                </div>
                <Link to="/profile">
                    <div className="nav-item nav-item-right" onClick={() => showMenu(state => !state)}>
                        <img className='avatar' src={avatar} alt='avatar' />
                        <UserContext.Consumer>
                            {(context) => {
                                return context.username;
                            }}
                        </UserContext.Consumer>
                    </div>
                </Link>
            </div>
        </>
    );
}
