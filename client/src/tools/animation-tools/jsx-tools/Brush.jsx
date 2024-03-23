import React from 'react';
import svgToolState from "../../../store/svgToolState";

const Brush = ({ d }) => {
    return (
            <path d={d} fill="none" stroke={svgToolState.strokeColor} strokeWidth={svgToolState.stroke} strokeLinejoin="round" strokeLinecap="round"/>
    );
};

export default Brush;