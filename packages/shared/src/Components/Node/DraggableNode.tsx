import React, { useEffect } from "react"
import { useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import styled from "styled-components"
import Node from "./Node";

import { Container, draggable } from './styles';

interface IProps {
    id: string
    left: number
    top: number
}

const StyledNode = styled(Node)`
    ${draggable}
`;

const DraggableNode: React.FC<IProps> = ({ id, left, top, children }) => {

    const [{ isDragging }, ref, preview] = useDrag({
        item: {
            type: 'POINT',
            id,
            left,
            top,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <StyledNode left={left} top={top} id={id} innerRef={ref} isDragging={isDragging}>
            {children}
        </StyledNode>
    );
};

export default DraggableNode;



/*
    Node
    - position [x, y] (0-1 precentage)
    -


    Position functiality in Node
    - DragNode for drag functionality
      - Point for graphic and config
    - Alarm for show sound and graphic

*/