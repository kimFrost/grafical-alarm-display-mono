import styled, { css } from 'styled-components';

interface IProps {
    left: number
    top: number
    isDragging: boolean
}

const GroupedStyling = css`

`;

//const transform = `translate3d(${left * 100}%, ${top * 100}%, 0)`

export const Container = styled.div<IProps>`
    position: absolute;
    left: ${props => props.left * 100}%;
    top: ${props => props.top * 100}%;
    opacity: ${props => props.isDragging ? 0 : 1};
    height: ${props => props.isDragging ? 0 : ''};

    ${props => props.isDragging && `
        ${GroupedStyling}
    `}
`;
