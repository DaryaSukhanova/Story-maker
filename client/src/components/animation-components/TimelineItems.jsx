import React, {useRef} from 'react';
import TimelineTool from "./TimelineTool";
import TimelineLine from "./TimelineLine";
import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import {observer} from "mobx-react-lite";
import timelineBlockState from "../../store/timelineBlockState";
import KeyFrameManager from "../../tools/animation-tools/KeyFrameManager";


const TimelineItems = observer(({ findNearestTickPosition, updateKeysInSvgElement }) => {

    const thumbCurrent = useRef(null);
    return (
        <div className="timeline-items">
            {svgCanvasState.svgElements.map((svgElement, index) => (
                <React.Fragment key={`fragment-${index}`}>
                    {(svgElement.isAnimated && animationToolState.tool instanceof KeyFrameManager) && (
                        <div className="timeline-item">
                            <TimelineTool
                                key={`tool-${index}`}
                                element={svgElement}
                            />
                            <TimelineLine
                                key={`line-${index}`}
                                id={svgElement.id}
                                findNearestTickPosition={findNearestTickPosition}
                                keyframesKeys={svgElement.keys}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}


        </div>
    );
});

export default TimelineItems;