import React, {useRef} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import TimelineLine from "./TimelineLine";
import {observer} from "mobx-react-lite";

const TimelineKeyframes = observer(({findNearestTickPosition})  => {
    const thumbCurrent = useRef(null);
    return (
        <div className="timeline-keyframes">
            <div className="thumb-current" ref={thumbCurrent} style={{ transform: `translateX(${timelineBlockState.roundedElapsedTime * (150 / 1000)-1}px)` }}></div>
            <TimelineLine findNearestTickPosition={findNearestTickPosition}/>
        </div>
    );
});

export default TimelineKeyframes;