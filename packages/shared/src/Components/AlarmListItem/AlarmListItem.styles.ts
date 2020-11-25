import { BorderClearRounded } from '@material-ui/icons';
import styled, { CSSObject, keyframes } from 'styled-components';
import { EAlarmType } from '../../Types/types';
import { getColorByType } from '../../util/styles/getColorByType';

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

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    //padding: 10px;
    width: 100%;
    //border-bottom: 1px solid rgb(192, 192, 192);
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;

    ${Spinner} {
        position: absolute;
        right: 2em;
    }
`;

interface IIconWrapperProps {
    type: EAlarmType;
}

export const IconWrapper = styled.div<IIconWrapperProps>(({ type }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: '6px',
    borderColor: getColorByType(type),
    color: getColorByType(type),
    width: '55px',
    height: '55px',
    fontSize: '45px',
    marginRight: '10px',
}))




// export const IconWrapper = styled.div<IIconWrapperProps>({
//     border: '2px solid black',
//     borderRadius: '6px',
//     backgroundColor: ({type}) => getIconColorByType(type)
// })

// export const IconWrapper2 = styled.div<IIconWrapperProps>`
//     border: 2px solid black;
//     border-radius: 6px;
//     background-color: ${({ type }) => {
//         return getColorByType(type)
//     }}
// `
