import React from 'react';
import '../styles/timeline-block.scss'
const TimelineBlock = () => {
    return (
        <div className="timeline-block">
            <div className="timeline-player">
                <button className="btn left-stop-button" id="leftStopBtn"></button>
                <button className="btn play-button" id="playBtn"></button>
                <div className="timer">00:00</div>
                <div className="slider-container">
                    <input className="speed-slider" id="speedSlider" type="range" min="1" max="50" value="5"/>
                </div>
            </div>
        </div>
    );
};

export default TimelineBlock;