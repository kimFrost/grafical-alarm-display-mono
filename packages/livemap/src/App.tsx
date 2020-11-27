import React, { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState } from 'recoil';
import ReactDOM from 'react-dom';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
    IAlarm,
    ILocation,
    EAlarmType,
    selectedAlarmState,
    selectedLocationState,
    usePrevious,
    useEffectChange,
    Livemap,
    AlarmList
} from '@kimfrost/shared';

import './App.scss';

const App = () => {

    //console.log('selectedAlarmState', selectedAlarmState)

    const [selectedAlarm] = useRecoilState(selectedAlarmState);
    const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationState);

    const [locations, setLocations] = useState<ILocation[]>([]);
    const [alarms, setAlarms] = useState<IAlarm[] | null>(null);

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const prevAlarms = usePrevious(alarms);

    console.log('new app instance', socket)

    useEffect(() => {
        if (selectedAlarm) {
            const alarmLocation = locations.find(location => location.Id === selectedAlarm.Location)
            if (alarmLocation) {
                setSelectedLocation(alarmLocation)
            }
        }
    }, [selectedAlarm, locations])

    useEffect(() => {
        if (!selectedLocation) {
            const mostUrgentAlarm = (alarms && alarms.length) ? (alarms as IAlarm[]).reduce((prev, current) => {
                return (prev.Priority > current.Priority) ? prev : current
            }) : null;

            let location;
            if (mostUrgentAlarm) {
                location = (locations as ILocation[]).find(location => location.Id === mostUrgentAlarm.Location);
            }
            location = location ? location : locations[0];
            if (location) {
                setSelectedLocation(location);
            }
        }
    }, [alarms, locations])

    useEffectChange(() => {
        if (prevAlarms) {
            if (alarms !== prevAlarms && alarms && alarms.length > prevAlarms.length) {
                const newAlarms = alarms.filter(alarm => !prevAlarms.some(prevAlarm => alarm.Id === prevAlarm.Id))
                const oldAlarms = alarms.filter(alarm => prevAlarms.some(prevAlarm => alarm.Id === prevAlarm.Id))
                if (newAlarms.length) {
                    const currentHighestPriority = oldAlarms.reduce((prev, current) => {
                        return (current.Priority > prev) ? current.Priority : prev
                    }, -1)
                    const newHighestPriority = newAlarms.reduce((prev, current) => {
                        return (current.Priority > prev) ? current.Priority : prev
                    }, -1)

                    if (newHighestPriority !== -1 && newHighestPriority > currentHighestPriority) {
                        const mostUrgentAlarm = newAlarms.reduce((prev, current) => {
                            return (current.Priority > prev.Priority) ? current : prev
                        });
                        if (mostUrgentAlarm) {
                            const location = locations.find(location => location.Id === mostUrgentAlarm.Location);
                            if (location) {
                                setSelectedLocation(location);
                            }
                        }
                    }

                    newAlarms.map(alarm => {
                        // Trigger sounds 
                        if (alarm.Type === EAlarmType.CARDIAC_ARREST) {
                            const audio = new Audio('./sounds/heart_attack.wav');
                            const promise = audio.play();
                            promise.then(() => console.log('audio played'))
                            promise.catch((e) => console.error('audio error', e))
                        }
                    })
                    console.log(
                        'new alarms',
                        JSON.parse(JSON.stringify(newAlarms))
                    )
                }
            }
        }
    }, [alarms, prevAlarms])

    useEffect(() => {
        if (!socket) {
            console.log('new socket')
            setSocket(new WebSocket("ws://localhost:5002"))
        }
    }, [socket])

    useEffect(() => {
        if (socket) {
            socket.onopen = () => console.log('Conenction established')
            socket.onclose = () => {
                console.log('socket closed ')
                setTimeout(() => {
                    setSocket(null)
                }, 3000)
            }
            socket.onerror = (error) => console.log('Conenction error', error)
            socket.onmessage = (e: MessageEvent) => {
                const event = JSON.parse(e.data);
                const data = event.data;
                ReactDOM.unstable_batchedUpdates(() => {
                    setAlarms(data.alarms);
                    setLocations(data.locations)
                })
            }
            return () => {
                socket.close()
            }
        }
    }, [socket])

    return (
        <div className="app">
            <div className="app__body">
                <div className="app__aside">
                    <AlarmList alarms={alarms || []} />
                </div>
                <div className="app__controls">
                    <Select value={selectedLocation ? selectedLocation.Id : null} variant="outlined" onChange={(e) => {
                        const location = locations.find(location => location.Id === e.target.value);
                        if (location) {
                            setSelectedLocation(location)
                        }
                    }}>
                        {locations.map(location => (
                            <MenuItem key={location.Id} value={location.Id}>{location.Id}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Livemap alarms={alarms || []} />
            </div>

        </div>
    )
}

export default App;