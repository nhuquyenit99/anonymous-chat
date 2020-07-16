import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getConfig } from 'config';

import './style.scss';
import { UserInfoPanel } from 'components/user-info-panel';
import { ActiveUserPanel } from 'components/active-user-panel';

export function NavBar() {
    const [show, showMenu] = useState(false);
    return (
        <>
            <div className={`nav-bar ${show && 'nav-open'}`}>
                <Link to="/">
                    <div className="branch-name">
                        {`${getConfig('BRANCH_NAME')}`}
                        <MenuOutlined className="menu-toggle" onClick={() => showMenu(state => !state)} />
                    </div>
                </Link>
                {/* <div className="nav-item">
                <Link to="/">
                    Home
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/profile">
                    Profile
                </Link>
            </div> */}
                <div className="nav-item nav-item-right">Login&nbsp;&nbsp;&nbsp;</div>
            </div>
            <div>
            </div>
        </>
    );
}
