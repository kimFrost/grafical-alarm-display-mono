
import { hubConnection } from 'signalr-no-jquery';

const options = {
    //useDefaultPath: false
    //qs: { access_token }
    //qs: { 'Token': token }
};
const url = 'http://localhost:8082';

const connection = hubConnection(url, options);
const proxy = connection.createHubProxy('logViewHub');

proxy.on('alarmsForGraphicalDisplay', (alarms: any) => console.log('alarmsForGraphicalDisplay', alarms));
proxy.on('reloadAlarms', () => proxy.invoke('GetAlarmsForGraphicalDisplay'));
proxy.on('reloadActions', (alarms: any) => console.log('reloadActions', alarms));

connection.start({ useDefaultPath: false })
    .done(function () {
        console.log('Now connected', connection);
        proxy.invoke('GetAlarmsForGraphicalDisplay')
    })
    .fail(function () { console.log('Could not connect'); })
connection.disconnected(() => console.log('disconnected')) 