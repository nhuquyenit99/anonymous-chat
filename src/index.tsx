import React from 'react';
import ReactDOM from 'react-dom';
import { RootApplication } from './app';
import * as serviceWorker from './serviceWorker';

import './style/index.scss';
import './style/variables.scss';
import { UserContextProvider } from 'context';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <RootApplication />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
