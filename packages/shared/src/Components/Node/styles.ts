import styled, { css } from 'styled-components';

interface IProps {
    left: number
    top: number
}

// Containers
export const NodeRoot = styled.div<IProps>`
    position: absolute;
    left: ${props => props.left * 100}%;
    top: ${props => props.top * 100}%;
`;
