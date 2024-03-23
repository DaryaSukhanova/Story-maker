import React from 'react';

const Brush = ({ d, stroke }) => {
    return (
            <path d={d} fill="none" strokeWidth={stroke} stroke="black" strokeLinejoin="round" strokeLinecap="round"/>
    );
};

export default Brush;