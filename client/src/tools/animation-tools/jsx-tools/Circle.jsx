import React, {useState} from 'react';
import svgToolState from "../../../store/svgToolState";
import {observer} from "mobx-react-lite";

const Circle = observer(({ cx, cy, r}) => {
    return (
        <circle cx={cx} cy={cy} r={r} stroke={svgToolState.strokeColor} strokeWidth={svgToolState.stroke} fill={svgToolState.fillColor}/>
    );
});
export default Circle;