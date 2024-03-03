import React from 'react';

const LayerButton = ({id, layerName, func}) => {
    return (
        <button key={id} onClick={func}>
            {layerName}
        </button>
    );
};

export default LayerButton;