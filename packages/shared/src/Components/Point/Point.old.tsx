
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { Container } from './styles';

export interface IPointProps {
    id: string
    left: number
    top: number
}

const Point: React.FC<IPointProps> = (props) => {
    const { id, left, top } = props;
    const [{ isDragging }, ref, preview] = useDrag({
        item: {
            type: 'POINT',
            id,
            left,
            top,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <Container ref={ref} {...props} isDragging={isDragging} className="point">
            {id}
        </Container>
    )
}
export default Point;