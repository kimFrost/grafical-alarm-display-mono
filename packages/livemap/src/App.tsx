import React from 'react'
import { atom, useRecoilState } from 'recoil';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
    Livemap,
    AlarmList,
    useAlarmData,
    useAlarmDataSignalr,
    selectedLocationState,
} from '@kimfrost/shared';

import './App.scss';



const App: React.FC = () => {
    //const { alarms, locations } = useAlarmData()
    const { alarms, locations } = useAlarmDataSignalr()

    const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationState);

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
