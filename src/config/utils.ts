export function configFactory() {
    function getConfig(key: string, def: any = '') {
        let value = def;
        if (typeof def === 'function') {
            value = def(process.env[`REACT_APP_${key}`] || '');
        }
        return process.env[`REACT_APP_${key}`] || value;
    }
    return {
        getConfig,
    };
}

export function configMessage() {
    function getConfigMessage(message: any) {
        const mesArray = message.toString().split(',');
        const userSendId = mesArray[0];
        const userSendName = mesArray[1];
        const mesContent = mesArray[2];
        const mesKey = mesArray[3];
        return {
            userId: userSendId,
            username: userSendName,
            content: mesContent,
            read: false,
            time: getTime(),
            key: mesKey
        };
    };
    function getTime() {
        let date = new Date();
        let hour = date.getHours().toString();
        if (hour.length === 1) hour = '0' + hour;
        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = '0' + minute;
        return hour + ':' + minute;
    };
    return {
        getConfigMessage,
        getTime
    };
}