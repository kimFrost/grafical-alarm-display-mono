import { Button } from '@material-ui/core';
import { rgba } from 'polished';
import { ENTERING, ENTERED, EXITING, EXITED, TransitionStatus } from 'react-transition-group/Transition';
import styled, { keyframes, css } from 'styled-components';
import { EAlarmType, ERequestStatus, IRequest } from '../../Types/types';

import { getColorByType } from '../../util/styles/getColorByType';



interface IProps {
    state: TransitionStatus
    request?: IRequest
    pending?: boolean
    type: EAlarmType
    selected: boolean
    acknowledged: boolean
    zIndex?: number
}

const SIZE: number = 50;

const test = () => keyframes({
    "0%": {
        opacity: 0
    },
    "100%": {
        opacity: 1
    }
})

const moveIn = () => keyframes`
    0% {
        transform: scale(5) rotate(45deg);
        opacity: 0;
        //box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.3);
    }
    100% {
        transform: scale(1);
        opacity: 1;
        //box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
    }
`;

const moveInAcknowledged = () => keyframes`
    0% {
        transform: scale(5) rotate(45deg);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 0.4;
    }
`;

const pulse = () => keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    70% {
		box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
	}
    100% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
`

const rotateOut = () => keyframes`
    0% {
        transform: rotate(0deg) scale(1);
    }
    100% {
        transform: rotate(720deg) scale(0);
    }
`

const spin = () => keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    display: block;
    box-sizing: border-box;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    border-top: 2px solid #00b0ba;
    border-right: 2px solid transparent;
    animation: ${spin} 600ms infinite linear;
`

export const Container = styled.div<IProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: absolute;
    width: ${SIZE}px;
    height: ${SIZE}px;
    font-size: 30px;
    left: -${SIZE / 2}px;
    top: -${SIZE / 2}px;
    border: 2px solid black;
    border-color: ${props => getColorByType(props.type)};
    color: ${props => getColorByType(props.type)};
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    z-index: ${props => props.selected ? 10 : (props.acknowledged ? 0 : props.zIndex)};
    
    ${Spinner} {
        position: absolute;
    }
    
    ${props => {
        if (props.state === ENTERING) {
            return css`
                animation: ${moveIn} 500ms ease;
            `;
        }
        else {
            if (!props.acknowledged) {
                return css`
                    animation: ${pulse} 1s 1500ms infinite;
                `;
            }
        }
    }}

    ${props => props.acknowledged ? css`
        border-color:  ${rgba(getColorByType(props.type), 0.4)};
        color: ${rgba(getColorByType(props.type), 0.4)};
    ` : null}
    ${props => props.selected ? css`
        border-width: 6px;
    ` : null}
    ${props => props.pending ? css`
        animation: none;
    ` : null}
    ${props => props.request && props.request.status === ERequestStatus.PENDING ? css`
        //animation: ${rotateOut} 600ms 1 linear;
        //animation-fill-mode: forwards;  
        animation: none;
    ` : null}
`;

export const InnerContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
`;

interface IModalProps {
    show: boolean
}

export const Modal = styled.div<IModalProps>`
    display: block;
    position: absolute;
    bottom: 100%;
    padding: 1em;
    font-size: 16px;
    background-color: #fff;
    border-radius: 0.5em;
    transition: all 300ms ease;
    opacity: 0;
    transform: translateY(-0.5em);
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);
    &::before {
        content: "";
        display: block;
        position: absolute;
        bottom: -16px;
        left: calc(50% - 12px);
        background: inherit;
        width: 25px;
        height: 25px;
        transform-origin: 50% 50%;
        transform: rotate(45deg);
        z-index: -1;
        box-sizing: border-box;
        border-bottom: 5px solid rgba(0, 0, 0, 0.3);
        border-right: 5px solid rgba(0, 0, 0, 0.3);
    }
    ${props => props.show ? css`
        opacity: 1;
        transform: translateY(-2em);
    ` : `
        pointer-events: none;
    `}
`

interface IButtonProps {
    show: boolean
}

const ButtonStyles = css<IButtonProps>`
    opacity: 0;
    transition: all 300ms ease;
    ${props => props.show ? css`
        opacity: 1;
        transform: translate(0, 0);
    `: css`
        pointer-events: none;
    `}
`;

export const ButtonApprove = styled(Button) <IButtonProps>`
    && {
        position: absolute;
        transform: translate(25%, 0);
        right: calc(100% + 1.5em);
        ${ButtonStyles}
    }
`

export const ButtonReject = styled(Button) <IButtonProps>`
    && {
        position: absolute;
        transform: translate(-25%, 0);
        left: calc(100% + 1.5em);
        ${ButtonStyles}
    }
`