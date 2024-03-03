import React, {useState} from 'react';

const LayerButton = ({id, layerName, func, isActive}) => {
    // const [isActiveState, setIsActiveState] = useState(isActive);
    const handleClick = () => {
        func();
        // setIsActiveState(!isActiveState); // Переключаем состояние активности
    };
    return (
        <div
            className={`layer-selector__item ${isActive ? 'active' : ''}`}
            key={id}
            onClick={handleClick}
        >
                {layerName}
        </div>
    );
};

export default LayerButton;