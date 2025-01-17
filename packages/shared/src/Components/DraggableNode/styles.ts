import styled, { css } from 'styled-components';
import Node from '../Node';
//import { NodeRoot } from './../Node/styles';

interface IDragProps {
    isDragging: boolean;
}

// States
export const draggable = css<IDragProps>`
    opacity: ${props => props.isDragging ? 0.3 : 1};
    font-size: 20px;
    cursor: grab;
    /* &:hover {
        z-index: 2;
    } */
`;

// export const StyledNode = styled(NodeRoot)`
//     ${draggable}
// `;

export const StyledNode = styled(Node)`
    ${draggable}
`;