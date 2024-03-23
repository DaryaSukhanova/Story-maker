import React from 'react';
import svgToolState from "../../../store/svgToolState";

const Line = ({d}) => {
    return (
        <path d={d} stroke={svgToolState.strokeColor} strokeWidth={svgToolState.stroke} fill={svgToolState.fillColor} strokeLinejoin="round" strokeLinecap="round" />

    );
};

export default Line;