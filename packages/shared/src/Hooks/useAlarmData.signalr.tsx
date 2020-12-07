import React, { useEffect, useState } from 'react'
import { Connection, hubConnection } from 'signalr-no-jquery';
import useAPI from '../Components/API/useAPI';
import { IAlarm, ILocation } from '../Types/types';

// const api = new APIKit({
//     baseURL: 'https://localhost:8083/api',
//     timeout: 5000,
//     headers: {
//         ctAuthKey: "C551E850-5BD5-4159-8505-85A11C75E4DB"
//     }
// })

const useAlarmDataSignalr = () => {

    const [locations, setLocations] = useState<ILocation[]>([]);
    const [alarms, setAlarms] = useState<IAlarm[] | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const api = useAPI();

    const fetchLocations = () => {
        if (api) {
            api.get('/crossorigin/GetAllowedUnits')
            .then(response => {
                console.log(response)
                setLocations(response.data)
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        fetchLocations();
    }, [])

    useEffect(() => {
        if (!connection) {
            const options = {
                //useDefaultPath: false
                //qs: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MGU0NTAwZS1hYjIyLTQ4NGMtODQ5Ni1hMDMwMDE4YWI1NjciLCJpZCI6IjU2YmZhZTFmLTZjYTMtNDllMC1hNGM5LWNiY2FjZGM3YzlkZiIsIm5hbWUiOiJUdW5zdGFsbCBBZG1pbiIsImV4cCI6MTYzODIxMjE4MywiaXNzIjoiVHVuc3RhbGwgU2VydmljZSBIdWIiLCJhdWQiOiJUdW5zdGFsbCBTZXJ2aWNlIEh1YiJ9.HEWzbRAXPBClp2itGZ_s4b_CmDBxQN_UxqQpqCu2068'
            };
            const url = 'https://localhost:8082';
            const connection = hubConnection(url, options);
            setConnection(connection)
        }
    }, [connection])

    useEffect(() => {
        if (connection) {
            console.log('connection', connection)

            const proxy = connection.createHubProxy('serviceHub');

            proxy.on("getAlarms", (data) => {
                console.log("GetAlarms", data);
                //setAlarms(data)
            });

            proxy.on('reloadAlarms', () => {
                console.log('reloadAlarms')
            });
            proxy.on('reloadActions', (alarms: any) => console.log('reloadActions', alarms));

            connection.start({ useDefaultPath: false })
                .done(function () {
                    console.log('Now connected', connection);
                    proxy.invoke('reloadAlarms')
                })
                .fail(error => console.log('Could not connect', error))
            connection.disconnected(() => console.log('disconnected'))
        }
    }, [connection])


    return {
        alarms: alarms,
        locations: locations
    };
}
export default useAlarmDataSignalr;