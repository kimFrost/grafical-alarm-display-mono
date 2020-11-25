import React, { forwardRef } from 'react';

import { Container } from './styles';

export interface INodeProps {
    id: string
    left: number
    top: number
}

const Node =
    forwardRef<HTMLDivElement, INodeProps & { className?: string, children?: any }>(({ id, left, top, className, children }, ref) => {
        return (
            <Container left={left} top={top} ref={ref} className={className}>
                {children}
            </Container>
        );
    });

export default Node;
