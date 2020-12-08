import styled, { css } from 'styled-components';

interface IProps {

}

const GroupedStyling = css`

`;

//const transform = `translate3d(${left * 100}%, ${top * 100}%, 0)`

export const PointRoot = styled.div<IProps>`
   display: block;
    position: relative;
    box-sizing: border-box;
    transform-origin: 50% 50%;
    z-index: 1;
    &::before {
        display: block;
        content: "";
        position: absolute;
        z-index: -1;
        width: 50px;
        height: 50px;
        left: -25px;
        top: -25px;
        background-color: #0CA0CF;
        border: 2px solid #000;
        border-radius: 10px;
    }   
    
    /* .point--preview {
        user-select: none;
        //transition: transform 300ms ease;
        &::before {
            background-color: hotpink;
        }
    }

    .point--dragging {

    } */
`;

/* ${props => props.isDragging && `
     ${GroupedStyling}
 `} */


