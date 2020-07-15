import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Module, RootModule } from 'core';
import { AppWrapper, NotFoundPage } from 'components';
// import { ProfilePage } from 'modules/chat-room/pages';
import mqtt from 'mqtt';
import { setClient } from 'client';
import { UserContext } from 'context';

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

        const mqtt_client = mqtt.connect('wss://test.mosquitto.org:8081', options);
        setClient(mqtt_client);

        mqtt_client.on('connect', () => {
            mqtt_client.subscribe('/public');
            mqtt_client.publish('/new_user', JSON.stringify(this.context.userId));
        });

        this.setState({ loading: false });
    }

    renderRoute() {
        return Object.entries(this.rootModule.routes()).map(([key, route]) => {
            return <Route key={route.path} {...route} />;
        });
    }
    render() {
        console.log('render RootApplication');
        if (this.state.loading) {
            return <span>Loading</span>;
        }
        return (
            <BrowserRouter basename="/">
                <AppWrapper>
                    <Switch>
                        {this.renderRoute()}
                        <Route component={NotFoundPage} />
                    </Switch>
                </AppWrapper>
            </BrowserRouter>
        );
    }
}

RootApplication.contextType = UserContext;

export { RootApplication };
