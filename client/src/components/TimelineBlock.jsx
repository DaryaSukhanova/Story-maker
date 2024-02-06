import React, { useEffect, useState, useRef } from 'react';
import '../styles/timeline-block.scss';
import animationToolState from '../store/animationToolState';
import {observer} from "mobx-react-lite";

const TimelineBlock = observer (() => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    let currentPlay = false
    useEffect(() => {
        if (animationToolState.currentPlay) {
            // const startTime = animationToolState.startTime
            intervalIdRef.current = setInterval(() => {
                const currentTime = Date.now();
                const newElapsedTime = currentTime - animationToolState.startTime;
                setElapsedTime(newElapsedTime);

            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [animationToolState.currentPlay]);

    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time % 100);
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
});

export default TimelineBlock;
