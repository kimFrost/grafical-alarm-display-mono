import React from 'react';

import { Container, IconWrapper, Spinner } from './AlarmListItem.styles';
import { getAlarmIcon } from './../../util/getAlarmIcon';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Button as MuiButton, makeStyles, Theme } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import styled, { keyframes, css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedAlarmState, requestsState } from './../../State/atoms';
import { TransitionStatus } from 'react-transition-group/Transition';
import { ERequestStatus, IAlarm } from '../../Types/types';
import useAlarmInteraction from './../../hooks/useAlarmInteraction';

interface IProps {
    alarm: IAlarm,
    state: TransitionStatus
}

const Button = styled(MuiButton)(spacing);

interface IStyleProps {
    alarm?: IAlarm
    acknowledge?: boolean
    state?: TransitionStatus
}

// const AccordionStyled = styled(Accordion)<IProps>`
//     && {
//         background-color: ${props => props.expanded ? 'green' : 'red'}
//     }
// `;

const getColorByState = (state: string): string => {
    switch (state) {
        case 'entering':
            return 'red'
        case 'entered':
            return 'blue'
        case 'exiting':
            return 'green'
        case 'exited':
            return 'yellow'
        case 'appear':
            return 'hotpink'
        default:
            return 'transparent'
    }
}

const getTransform = (state: string): string => {
    switch (state) {
        case 'entering':
            return 'translate(-100%, 0%)'
        case 'entered':
            return 'translate(0%, 0%)'
        case 'exiting':
            return 'translate(-100%, 0%)'
        case 'exited':
            return 'translate(-100%, 0%)'
        default:
            return 'transparent'
    }
}

const isShow = (state: string): boolean => {
    switch (state) {
        case 'entering':
            return false
        case 'entered':
            return true
        case 'exiting':
            return false
        case 'exited':
            return false
        default:
            return true
    }
}

const moveIn = () => keyframes`
    0% {
        transform: translate(-100%, 0);
        max-height: 0;
    }
    50% {
        transform: translate(-100%, 0);
        max-height: 100px;
    }
    100% {
        transform: translate(0, 0);
        max-height: 100px;
    }
`;

const moveOut = () => keyframes`
    0% {
        max-height: 100px;
    }
    100% {
        transform: translate(-100%, 0);
        max-height: 0;
    }
`;

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};


// const moveInAnimation = css`
//   animation: ${moveIn} 500ms ease;
// `;

const AccordionStyled2 = styled(Accordion)<IStyleProps>(({ state }) => ({
    //transition: 'all 500ms ease',
    //transform: getTransform(state),
    //animation: `${({state}:any) => moveIn} 500ms ease`,
    //maxHeight: isShow(state) ? '500px' : '0',
    //backgroundColor: getColorByState(state)
}))

const AccordionStyled = styled(Accordion) <IStyleProps>`
    //animation: ${moveIn} 500ms ease;
    ${({ state }) => {
        if (state === 'entering') {
            return css`
                animation: ${moveIn} 500ms ease;
            `
        }
        else if (state === 'entered') {
            return css`
                animation: ${moveIn} 500ms ease;
            `
        }
        else if (state === 'exiting') {
            return css`
                animation: ${moveOut} 500ms ease;
            `
        }
        else if (state === 'exited') {
            return css`
                display: none;
            `
        }
        return ``
    }}
   ${props => props.expanded ? css`
        position: relative;
        &::after {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 5px;
            background: #b1b1b1;
        }
        && {
            //margin-top: 0;
        }
   `: null}
`;

const AccordionSummaryStyled = styled(AccordionSummary) <IStyleProps>`
    ${props => props.acknowledge ? css`
        opacity: 0.4; 
    `: null}
`;

//animation: css`${moveIn} 500ms ease}`,

const useStyles = makeStyles<Theme, IStyleProps>((theme) => {
    return {
        accordion: {
            //backgroundColor: props => props.alarm ? 'green' : 'red'
        }
    }
})


const AlarmListItem: React.FC<IProps> = ({ alarm, state }) => {

    const classes = useStyles({})
    const [selectedAlarm, setSelectedAlarm] = useRecoilState(selectedAlarmState);
    //const [request, setRequest] = useRecoilState(requestsState(alarm.Id))

    const { request, acceptAlarm, rejectAlarm } = useAlarmInteraction(alarm)

    const handleChange = (alarm: IAlarm) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setSelectedAlarm(newExpanded ? alarm : null);
    };


    return (
        <AccordionStyled
            className={classes.accordion}
            state={state}
            acknowledge={alarm.Acknowledged}
            expanded={selectedAlarm ? selectedAlarm.Id === alarm.Id : false}
            onChange={handleChange(alarm)}
        >
            <AccordionSummaryStyled acknowledge={alarm.Acknowledged} aria-controls="panel1d-content" id="panel1d-header">
                <Container>
                    <IconWrapper type={alarm.Type}>
                        {getAlarmIcon(alarm.Type)}
                    </IconWrapper>
                    <div>
                        <div>{request?.status}</div>
                        <div>{alarm.Id}</div>
                        <div>{alarm.Location}</div>
                        <div>{alarm.Type}</div>
                    </div>
                    {request && request.status === ERequestStatus.PENDING &&
                        <Spinner />
                    }
                </Container>
            </AccordionSummaryStyled>
            <AccordionDetails>
                <Button mr={2} variant="contained" color="primary" disabled={alarm.Acknowledged} onClick={() => {
                    acceptAlarm()
                    setSelectedAlarm(null)
                    //dispatch(selectAlarm(null))
                }}>Accept</Button>
                <Button variant="contained" color="secondary" onClick={() => {
                    rejectAlarm()
                    setSelectedAlarm(null)
                    //dispatch(selectAlarm(null))
                }}>Reject</Button>
            </AccordionDetails>
        </AccordionStyled>
    );
};

export default AlarmListItem;
