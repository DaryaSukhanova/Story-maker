import React, { useEffect, useState } from 'react';
import '../styles/timeline-block.scss';
import animationToolState from '../store/animationToolState';
import AnimationTool from "../tools/AnimationTool";
import MotionCurve from "../tools/MotionCurve";

const TimelineBlock = () => {

    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
        const currentTime = Date.now();
        const newElapsedTime = currentTime - startTime;
        setElapsedTime(newElapsedTime);

        }, 10);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time %100);
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    return (
        <div className="timeline-block">
            <div className="timeline-player">
                <button className="btn left-stop-button" id="leftStopBtn"></button>
                <button className="btn play-button" id="playBtn" onClick={(e) => animationToolState.setPlay()}></button>
                <div className="timer">{formatTime(elapsedTime)}</div>
                <div className="slider-container">
                    <input
                        className="speed-slider"
                        id="speedSlider"
                        type="range"
                        min="1"
                        max="20"
                        onChange={(e) => animationToolState.setSpeed(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineBlock;
