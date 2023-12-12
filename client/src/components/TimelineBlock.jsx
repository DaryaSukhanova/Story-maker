import React from 'react';
import '../styles/timeline-block.scss'
const TimelineBlock = () => {
    return (
        <div className="timeline-block">
            <div className="timeline-player">
                <button className="btn left-stop-button"></button>
                <button className="btn play-button"></button>
            </div>
        </div>
    );
};

export default TimelineBlock;