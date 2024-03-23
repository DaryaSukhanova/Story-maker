import React from 'react';

const Polyline = ({ points, stroke }) => {
    return (
        <polyline points={points} fill="none" strokeWidth={stroke} stroke="black" strokeLinejoin="round" strokeLinecap="round"/>
    );
};

export default Polyline;