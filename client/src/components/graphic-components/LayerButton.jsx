import React, {useState} from 'react';
import toolState from "../../store/toolState";
import Line from "../../tools/graphic-tools/Line";
import canvasState from "../../store/canvasState";
import {logDOM} from "@testing-library/react";
import {observer} from "mobx-react-lite";
import layerState from "../../store/layerState";

const LayerButton = observer(({id, layerName, func, isActive, isVisible}) => {
    // const [layerVisibility, setLayerVisibility] = useState({ [id]: true });

    const handleClick = () => {
        func();
    };

    return (
        <div
            className={`layer-selector__item ${isActive ? 'active' : ''}`}
            id={id}
            onClick={handleClick}
        >
            <div className="layer-selector__layer-btn"></div>
            <span>Слой {id+1}</span>
            <button className={`layer-selector__btn ${isVisible ? 'visible' : 'invisibleIcon'}`} onClick={()=> layerState.setVisibleLayer(id)}/>
        </div>
    );
});

export default LayerButton;