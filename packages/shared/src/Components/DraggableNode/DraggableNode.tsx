import React, { useEffect } from "react"
import { useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import { StyledNode } from "./styles";


interface IProps {
    id: string
    left: number
    top: number
}

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