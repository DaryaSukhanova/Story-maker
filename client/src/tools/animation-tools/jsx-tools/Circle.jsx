import React, {useState} from 'react';

const Circle = ({ cx, cy, r, stroke }) => {
    return (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="black" strokeWidth={stroke} />
    );
};
export default Circle;