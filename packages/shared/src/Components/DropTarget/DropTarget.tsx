import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

interface IDropTargetProps {
    accept: string | string[],
    onDrop: (item: any, monitor: DropTargetMonitor) => void
}

const DropTarget: React.FC<IDropTargetProps> = ({ accept, onDrop, children }) => {
    let component: any = null;

    const [{ canDrop, isOver }, dropTarget] = useDrop({
        accept,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item, monitor) => {
            onDrop(item, monitor);
            //const a = monitor.getInitialSourceClientOffset();
            const c = monitor.getClientOffset();
            if (c && component) {
                const targetRect = component.getBoundingClientRect();
                const [x, y] = [c.x - targetRect.left, c.y - targetRect.top];
                console.log([x, y, targetRect]);
            }
        }
    })

    return (
        <div ref={(ref) => {
            dropTarget(ref);
            component = ref
        }}>{children}</div>
    )

}


export default DropTarget;
