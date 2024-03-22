import React, {useState} from 'react';

const Circle = ({ cx, cy, r }) => {
    return (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="black" strokeWidth="2" />
    );
};
export default Circle;