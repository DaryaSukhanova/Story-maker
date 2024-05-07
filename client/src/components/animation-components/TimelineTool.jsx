import React, {useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";
import {logDOM} from "@testing-library/react";
import svgCanvasState from "../../store/svgCanvasState";



const TimelineTool = observer(({element }) => {

    const handleAddKeyClick = () => {
        svgCanvasState.addKeyframeToElement(element.id)
    };

    return (
        <div className="timeline-animation-tool">
            <div className="timeline-animation-tool__title">{element.shape.type}</div>
            <div className="btn-key add"  onClick={handleAddKeyClick}></div>
        </div>
    );
});

export default TimelineTool;