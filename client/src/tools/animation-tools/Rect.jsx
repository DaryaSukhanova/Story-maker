import React from 'react';

const Rect = ({x, y, width, height}) => {
    return (
        <rect x={x} y={y} width={width} height={height} fill="none" stroke="black" strokeWidth="2" />
    );
};

export default Rect;