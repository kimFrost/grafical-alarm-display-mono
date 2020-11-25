import styled, { css } from 'styled-components';

interface IProps {
    left: number
    top: number
}

// Containers
export const Container = styled.div<IProps>`
    position: absolute;
    left: ${props => props.left * 100}%;
    top: ${props => props.top * 100}%;
`;

interface IDragProps {
    isDragging: boolean;
}

// States
export const draggable = css<IDragProps>`
    opacity: ${props => props.isDragging ? 0.3 : 1};
    //height: ${props => props.isDragging ? 0 : ''};
    background: 'red';
`;

