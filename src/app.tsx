import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Module, RootModule } from 'core';
import { AppWrapper, NotFoundPage, Loading } from 'components';
import mqtt from 'mqtt';
import { setClient, getClient } from 'client';
import { UserContext, ListMessageContextProvider } from 'context';
import { getConfig } from 'config';
//import { UserInfoPanel, ActiveUserPanel } from 'modules/chat-room/components';

const INSTALLED_MODULE: any = {
    'chat-room': require('./modules/chat-room'),
};

class RootApplication extends React.Component<{}, { loading: boolean }> {
    rootModule: RootModule;
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: true,
        };
        this.rootModule = new RootModule();
    }
    componentDidMount() {
        this.init();

        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            let userInfo = {
                userId: this.context.userId,
                username: this.context.username
            };
            getClient().publish('/user_out', JSON.stringify(userInfo));
            this.context.clearActiveUsers();
        });
    }

    setupModule() {
        for (let key in INSTALLED_MODULE) {
            const module = new Module(key);
            INSTALLED_MODULE[key].setup(module);
            this.rootModule.register(module);
        }
    }

    async init() {
        this.setState({ loading: true });

        // Setup module
        this.setupModule();

        const host = getConfig('MQTT_URL');
        const port = getConfig('MQTT_PORT');

        let options: any = {
            clientId: Math.random().toString().substring(2),
            protocol: 'wss',
            host: host,
            port: port
        };

        const mqtt_client = mqtt.connect(options);
        setClient(mqtt_client);

        mqtt_client.on('connect', () => {
            this.setState({ loading: false });
            mqtt_client.subscribe('/public');
            const userInfo = {
                userId: this.context.userId,
                username: this.context.username
            };
            mqtt_client.publish('/new_user', JSON.stringify(userInfo));
        });
    }

    componentWillUnmount() {
    }

    renderRoute() {
        return Object.entries(this.rootModule.routes()).map(([key, route]) => {
            return <Route key={route.path} {...route} />;
        });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <BrowserRouter basename="/">
                {/* <UserContextProvider> */}
                <ListMessageContextProvider>
                    <AppWrapper>
                        {/* <div>
                            <ActiveUserPanel />
                        </div> */}
                        <Switch>
                            {this.renderRoute()}
                            <Route component={NotFoundPage} />
                        </Switch>
                        {/* <div>
                            <UserInfoPanel />
                        </div> */}
                    </AppWrapper>
                </ListMessageContextProvider>
                {/* </UserContextProvider> */}
            </BrowserRouter>
        );
    }
}

RootApplication.contextType = UserContext;

export { RootApplication };
