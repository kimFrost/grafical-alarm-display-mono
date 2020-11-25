import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Node from '../Node';

//import { Container } from './styles';
import Alarm from './../Alarm/Alarm';
import { selectedAlarmState, selectedLocationState } from './../../State/atoms';
import { IAlarm } from '../../Types/types';
import SuspenseImage from './../SuspenseImage';
import { TransitionGroup } from 'react-transition-group';

interface IProps {
    alarms: IAlarm[]
}

const Livemap: React.FC<IProps> = ({ alarms }) => {

    const imageRef = useRef<HTMLImageElement>(null);
    const [selectedAlarm, setSelectedAlarm] = useRecoilState(selectedAlarmState);
    const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationState);
    const [loading, setLoading] = useState(false);

    return (
        <div className="app__map" onClick={() => setSelectedAlarm(null)}>
            <div className="app__image" >
                <React.Suspense fallback={
                    <div>Loading</div>
                }>
                    <div className="app__points">
                        {!loading &&
                            alarms.map((alarm, index) => (
                                alarm.Location === selectedLocation?.Id ?
                                    <Node key={alarm.Id} id={alarm.Id} left={alarm.Position[0]} top={alarm.Position[1]}>
                                        <Alarm alarm={alarm} />
                                    </Node>
                                    : null
                            ))
                        }
                    </div>
                    <SuspenseImage src={selectedLocation?.ImageUrl} />
                </React.Suspense>
                {/* <img src={selectedLocation?.ImageUrl} onLoad={() => {
                    console.log('image loaded')
                    setLoading(false);
                }} ref={imageRef} /> */}
            </div>
        </div>
    );
};

export default Livemap;
