import React from 'react';
import '../styles/timeline-block.scss'
import animationToolState from "../store/animationToolState";
const TimelineBlock = () => {
    return (
        <div className="timeline-block">
            <div className="timeline-player">
                <button className="btn left-stop-button" id="leftStopBtn"></button>
                <button className="btn play-button" id="playBtn" onClick={e=>animationToolState.setPlay()}></button>

                {/*<button className="btn play-button" id="playBtn" ></button>*/}
                <div className="timer">00:00:00</div>
                <div className="slider-container">
                    <input className="speed-slider"
                           id="speedSlider"
                           type="range"
                           min="1"
                           max="20"
                           onChange={e => animationToolState.setSpeed(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineBlock;