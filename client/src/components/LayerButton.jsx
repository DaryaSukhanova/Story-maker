import React, {useState} from 'react';
import toolState from "../store/toolState";
import Line from "../tools/Line";
import canvasState from "../store/canvasState";
import {logDOM} from "@testing-library/react";
import {observer} from "mobx-react-lite";

const LayerButton = observer(({id, layerName, func, isActive}) => {
    const [layerVisibility, setLayerVisibility] = useState({ [id]: true });

    const handleClick = () => {
        console.log("active",isActive)
        func();
        // setIsActiveState(!isActiveState); // Переключаем состояние активности
    };

    return (
        <div
            className={`layer-selector__item ${isActive ? 'active' : ''}`}
            id={id}
            onClick={handleClick}
        >
            <span>{layerName}</span>
            <button className="layer-selector__btn visibility" onClick={()=> canvasState.toggleVisibility(id)}/>
        </div>
    );
});

export default LayerButton;