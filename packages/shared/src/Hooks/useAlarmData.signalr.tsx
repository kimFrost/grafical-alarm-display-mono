import React, { useEffect, useState } from 'react'
import { Connection, hubConnection } from 'signalr-no-jquery';
import useAPI from '../Components/API/useAPI';
import { IAlarm, ILocation, EAlarmType } from '../Types/types';
import { IDisplayImage, Guid } from './../Types/types';


const useAlarmDataSignalr = () => {

    const [locations, setLocations] = useState<ILocation[]>([]);
    const [alarms, setAlarms] = useState<IAlarm[] | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const api = useAPI();

    const fetchLocations = () => {
        if (api) {
            api.get('/crossorigin/GetAllowedUnits')
                .then(response => {
                    const data = response.data;
                    const getImage = async (location) => {
                        return new Promise<IDisplayImage | null>(resolve => {
                            api.get(`/crossorigin/GetGraphicalDisplayImage?unitId=${location.id}`)
                                .then(response => resolve(response.data))
                                .catch(error => resolve(null))
                        });
                        // return api.get(`/crossorigin/GetGraphicalDisplayImage?unitId=${location.id}`)
                    }
                    const getImages = async (data): Promise<any> => {
                        //return Promise.allSettled(data.map(location => getImage(location)))
                        return Promise.all(data.map(location => getImage(location)))
                    }
                    getImages(data)
                        .then(images => {
                            setLocations(data.map(location => {
                                let imageUrl = '';
                                images.forEach(image => {
                                    if (image && image.parentId === location.id)
                                        imageUrl = image.pathToImage;
                                });
                                return {
                                    id: location.id,
                                    ImageUrl: imageUrl
                                }
                            }))
                        })
                        .catch(error => console.log('error', error))

                    // Temp for testing
                    // const data = response.data.map(location => {
                    //     const width = Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200;
                    //     const height = Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200;
                    //     return {
                    //         id: location.id,
                    //         ImageUrl: `https://via.placeholder.com/${width}x${height}/0`
                    //     }
                    // })
                    // setLocations(data)

                })
                .catch(error => console.log(error))
        }
    }

    const fetchAlarms = () => {
        if (api) {
            api.get('/crossorigin/GetAlarmsForGraphicalDisplay')
                .then(response => {
                    console.log('GetAlarmsForGraphicalDisplay', response)
                    const alarms: IAlarm[] = response.data.map(entry => {
                        const config = entry.graphicalDisplayConfiguration;
                        const alarm: IAlarm = {
                            Id: entry.alarmId,
                            ZoneId: entry.zoneNumber,
                            ZoneText: entry.zoneText,
                            Location: entry.unitId,
                            Position: config ? [config.xValue, config.yValue] : [0, 0],
                            UnitText: '',
                            EquipmentPhysicalId: '',
                            Type: entry.alarmType.type,
                            Priority: 0,
                            Acknowledged: false
                        }
                        //entry.alarmType.sortOrder
                        //entry.alarmType.text
                        return alarm;
                    })
                    setAlarms(alarms)
                })
                .catch(error => console.log(error))
        }
    }

    const fetchLocationImage = (locationId) => {
        if (api) {
            api.get(`/crossorigin/GetGraphicalDisplayImage?unitId=${locationId}`)
                .then(response => {

                    const data = response.data as IDisplayImage
                    console.log('image', data)
                    // setLocations(locations.map(location => {
                    //     if (location.id === locationId) {
                    //         return {
                    //             id: location.id,
                    //             ImageUrl: ''
                    //         }
                    //     }
                    //     else {
                    //         return location
                    //     }
                    // }));

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        fetchLocations();
        fetchAlarms();
    }, [])

    // useEffect(() => {
    //     if (locations.length) {
    //         locations.forEach(location => {
    //             fetchLocationImage(location.id)
    //         });
    //     }
    // }, [locations])

    useEffect(() => {
        if (!connection) {
            const options = {
                //useDefaultPath: false
                //qs: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MGU0NTAwZS1hYjIyLTQ4NGMtODQ5Ni1hMDMwMDE4YWI1NjciLCJpZCI6IjU2YmZhZTFmLTZjYTMtNDllMC1hNGM5LWNiY2FjZGM3YzlkZiIsIm5hbWUiOiJUdW5zdGFsbCBBZG1pbiIsImV4cCI6MTYzODIxMjE4MywiaXNzIjoiVHVuc3RhbGwgU2VydmljZSBIdWIiLCJhdWQiOiJUdW5zdGFsbCBTZXJ2aWNlIEh1YiJ9.HEWzbRAXPBClp2itGZ_s4b_CmDBxQN_UxqQpqCu2068'
            };
            const url = 'http://localhost:8082';
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
                fetchAlarms();
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