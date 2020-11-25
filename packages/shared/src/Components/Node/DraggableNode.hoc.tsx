import React, { useEffect } from "react"
import { useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import styled from "styled-components"

import Node from "./Node"

interface IProps {
    id: string
    left: number
    top: number
}


const draggableNode = <P extends object>(Component: React.ComponentType<P>): React.FC<P & IProps> => (props: IProps) => {
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

    const ComponentWithAddedColors = styled<any>(Component) <IProps>`
        background: hotpink;
    `

    return (
        <ComponentWithAddedColors {...props as P} ref={ref} />
    )
}
const DraggableNode = draggableNode(Node);
export default DraggableNode;


/*
interface Props {
    bg: string;
}

function draggableNode<T>(Component: React.ComponentType<T>, additionalProps: Props) {
    const { bg } = additionalProps;
    const ComponentWithAddedColors = styled(Component)<Props>`
        ${bg && `background: ${bg};`}
    `
    const result: React.FC<T> = props => (
        <ComponentWithAddedColors {...props} {...(additionalProps as any)} />
    )
    return result
}

 const RedFoo = draggableNode(Node, {bg: 'hotpink'})
 export default RedFoo;
 */