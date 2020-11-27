import React from 'react'
import {
    AlarmList,
    useAlarmData
} from '@kimfrost/shared';

import './App.scss';

const App = () => {
    const { alarms } = useAlarmData()
    return (
        <div className="app">
            <AlarmList alarms={alarms || []} />
        </div>
    )
}

export default App;
