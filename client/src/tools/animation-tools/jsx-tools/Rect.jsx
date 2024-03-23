import React from 'react';
import svgToolState from "../../../store/svgToolState";

const Rect = ({x, y, width, height}) => {
    return (
        <rect x={x} y={y} width={width} height={height} stroke={svgToolState.strokeColor} strokeWidth={svgToolState.stroke} fill={svgToolState.fillColor} data-tool={true} />
    );
};

export default Rect;