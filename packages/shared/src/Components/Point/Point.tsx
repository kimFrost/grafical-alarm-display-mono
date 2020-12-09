
import React from 'react';

import { PointRoot } from './Point.styles';

const Point: React.FC = ({ children }) => {
    return (
        <PointRoot>
            {children}
        </PointRoot>
    )
}
export default Point;