import React from 'react';

const Polygon = ({ points, stroke }) => {
    console.log(points)
    return (
        <polylgon points={points} fill="none" strokeWidth={stroke} stroke="black" strokeLinejoin="round" strokeLinecap="round"/>

    );
};

export default Polygon;