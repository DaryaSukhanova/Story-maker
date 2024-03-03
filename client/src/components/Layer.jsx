import React from 'react';

const Layer = ({ id, canvasRef }) => {
    return (

        <canvas width={1100} height={644}  id={id} ref={canvasRef}></canvas>

    );
};

export default Layer;