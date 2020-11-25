import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useRecoilState, useRecoilValue } from 'recoil';

//import alarmSfx from './alarm.mp3';

import { ButtonApprove, Container, Modal, Spinner, ButtonReject, InnerContainer } from './Alarm.styles';
import { getAlarmIcon } from './../../util/getAlarmIcon';
import { selectedAlarmState, requestsState } from './../../State/atoms';
import { ENTERED } from 'react-transition-group/Transition';
import { ERequestStatus, IAlarm } from '../../Types/types';
import useAlarmInteraction from './../../hooks/useAlarmInteraction';


interface IProps {
    alarm: IAlarm
}

const Alarm: React.FC<IProps> = ({ alarm }) => {
    //const ref = useRef(null) nodeRef={ref} // will not update correctly with all states
    const [selectedAlarm, setSelectedAlarm] = useRecoilState(selectedAlarmState)
    const { request, acceptAlarm, rejectAlarm } = useAlarmInteraction(alarm)

    return (
        <Transition timeout={500} in={true} appear={true}>
            {(state) => (
                <Container
                    state={state}
                    zIndex={alarm.Priority}
                    type={alarm.Type}
                    request={request}
                    selected={selectedAlarm ? selectedAlarm.Id === alarm.Id : false}
                    acknowledged={alarm.Acknowledged}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (selectedAlarm === alarm) {
                            setSelectedAlarm(null)
                        }
                        else {
                            setSelectedAlarm(alarm)
                        }
                    }}
                >
                    <InnerContainer>
                        {getAlarmIcon(alarm.Type)}
                        {request && request.status === ERequestStatus.PENDING &&
                            <Spinner />
                        }
                        <Modal show={selectedAlarm ? (selectedAlarm.Id === alarm.Id && state === ENTERED) : false}>
                            {alarm.Type}
                        </Modal>
                        <ButtonApprove
                            show={selectedAlarm ? (selectedAlarm.Id === alarm.Id && state === ENTERED) : false}
                            variant="contained" color="primary"
                            onClick={() => acceptAlarm()}
                        >
                            Approve
                            </ButtonApprove>
                        <ButtonReject
                            show={selectedAlarm ? (selectedAlarm.Id === alarm.Id && state === ENTERED) : false}
                            variant="contained" color="secondary"
                            onClick={() => rejectAlarm()}
                        >
                            Reject
                            </ButtonReject>
                    </InnerContainer>
                </Container>
            )}
        </Transition>
    );
};

export default Alarm;
