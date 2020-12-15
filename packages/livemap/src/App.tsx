import React, { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
    Livemap,
    AlarmList,
    useAlarmData,
    useAlarmDataSignalr,
    selectedLocationState,
    selectedAlarmState,
    ILocation,
    IAlarm,
} from '@kimfrost/shared';

import './App.scss';



const App: React.FC = () => {
    //const { alarms, locations } = useAlarmData()
    const { alarms, locations } = useAlarmDataSignalr()

    const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationState);
    const [selectedAlarm] = useRecoilState(selectedAlarmState);

    useEffect(() => {
        if (!selectedLocation) {
            const mostUrgentAlarm = (alarms && alarms.length) ? (alarms as IAlarm[]).reduce((prev, current) => {
                return (prev.Priority > current.Priority) ? prev : current
            }) : null;

            let location;
            if (mostUrgentAlarm) {
                location = (locations as ILocation[]).find(location => location.id === mostUrgentAlarm.Location);
            }
            location = location ? location : locations[0];
            if (location) {
                setSelectedLocation(location);
            }
        }
    }, [alarms, locations])

    return (
        <div className="app">
            <div className="app__body">
                <div className="app__aside">
                    <AlarmList alarms={alarms || []} />
                </div>
                <div className="app__controls">
                    <Select value={selectedLocation ? selectedLocation.id : null} variant="outlined" onChange={(e) => {
                        const location = locations.find(location => location.id === e.target.value);
                        if (location) {
                            setSelectedLocation(location)
                        }
                    }}>
                        {locations.map(location => (
                            <MenuItem key={location.id} value={location.id}>{location.id}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Livemap alarms={alarms || []} />
            </div>

        </div>
    )
}

export default App;
