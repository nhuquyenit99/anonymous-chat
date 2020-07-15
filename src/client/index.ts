import mqtt from 'mqtt';

function mqttClientFactory() {
    let mqtt_client: mqtt.MqttClient;

    function setClient(client: mqtt.MqttClient) {
        mqtt_client = client;
    }

    function getClient(): mqtt.MqttClient {
        return mqtt_client;
    }

    return {
        setClient,
        getClient,
    };
}

export const { setClient, getClient } = mqttClientFactory();
