import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

import { Container } from './styles';

const dragLayerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null
) {
    if (!initialOffset || !currentOffset) {
        return {
            //display: 'none',
            opacity: 0
        }
    }

    let { x, y } = currentOffset

    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
        opacity: 1
    }
}

interface IDragLayerProps {

}

const DragLayer: React.FC<IDragLayerProps> = () => {

    const { isDragging, initialOffset, clientOffset, initialClientOffset, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        clientOffset: monitor.getClientOffset()
    }))

    // const offset = {
    //     x: initialOffset.x + initialClientOffset.x + currentOffset.x,
    //     y: initialOffset.y + initialClientOffset.y + currentOffset.y
    // }

    return (
        <div style={dragLayerStyles}>
            <div
                className={['point', 'point--preview', isDragging ? 'point--dragging' : null].join(' ')}
                style={getItemStyles(initialOffset, clientOffset)}>
            </div>
        </div>
    )
}

export default DragLayer;
