import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Module, RootModule } from 'core';
import { AppWrapper, NotFoundPage } from 'components';
import mqtt from 'mqtt';
import { setClient, getClient } from 'client';
import { UserContext, UserContextProvider, ListMessageContextProvider } from 'context';
import { UserInfoPanel, ActiveUserPanel } from 'modules/chat-room/components';

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
            this.context.groups = {};
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

        let options = {
            clientId: Math.random().toString().substring(2),
        };

        const mqtt_client = mqtt.connect('ws://178.128.90.235:8083', options);
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
            return <span>Loading...</span>;
        }
        return (
            <BrowserRouter basename="/">
                {/* <UserContextProvider> */}
                <AppWrapper>
                    <ListMessageContextProvider>
                        <ActiveUserPanel />
                        <Switch>
                            {this.renderRoute()}
                            <Route component={NotFoundPage} />
                        </Switch>
                        <UserInfoPanel />
                    </ListMessageContextProvider>
                </AppWrapper>
                {/* </UserContextProvider> */}
            </BrowserRouter>
        );
    }
}

RootApplication.contextType = UserContext;

export { RootApplication };
