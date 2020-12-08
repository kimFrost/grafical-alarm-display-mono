import React, { RefObject } from 'react';

import { NodeRoot } from './styles';

export interface INodeProps {
    id: string
    left: number
    top: number
    innerRef?: any 
}

const Node: React.FC<INodeProps & { className?: string }> = ({ id, left, top, children, innerRef, className }) => {
    return (
        <NodeRoot left={left} top={top} ref={innerRef} className={className}>
            {children}
        </NodeRoot>
    );
};

export default Node;
