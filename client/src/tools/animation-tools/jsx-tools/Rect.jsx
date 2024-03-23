import React from 'react';

const Rect = ({x, y, width, height, stroke}) => {
    return (
        <rect x={x} y={y} width={width} height={height} fill="none" stroke="black" strokeWidth={stroke} />
    );
};

export default Rect;