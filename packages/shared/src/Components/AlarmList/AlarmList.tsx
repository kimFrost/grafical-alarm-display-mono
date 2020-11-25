import React from 'react';

import { AlarmScrollList, Container } from './AlarmList.styles';
import { IAlarm } from '../../Types/types';
import AlarmListItem from '../AlarmListItem';
import { Transition, TransitionGroup } from 'react-transition-group';

interface IProps {
    alarms: IAlarm[]
}

const AlarmList: React.FC<IProps> = ({ alarms }) => {
    return (
        <Container>
            <AlarmScrollList>
                <TransitionGroup component={null}>
                    {alarms.map(alarm => (
                        <Transition key={alarm.Id} timeout={450} >
                            {(state) => (
                                <AlarmListItem alarm={alarm} state={state} />
                            )}
                        </Transition>
                    ))}
                </TransitionGroup>
            </AlarmScrollList>
        </Container>
    );
};

export default AlarmList;
