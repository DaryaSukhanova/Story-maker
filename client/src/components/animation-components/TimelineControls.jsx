import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import timelineBlockState from "../../store/timelineBlockState";
import timelineBlock from "./TimelineBlock";
import KeyFrameManager from "../../tools/animation-tools/KeyFrameManager";
import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";

const TimelineControls = observer( ({variant, totalTime} ) => {
    const containerClass = variant === 'wide' ? 'timeline-controls-wide' : 'timeline-controls-default';
    const isRunningThumb = timelineBlockState.isRunningThumb
    const roundedElapsedTime = timelineBlockState.roundedElapsedTime
    let elapsedTime = timelineBlockState.elapsedTime
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        // keyframeManagerRef.current = new KeyFrameManager(svgCanvasState.canvas);
        // return () => {
        //     // Очищаем экземпляр AnimationManager при размонтировании компонента
        //     keyframeManagerRef.current = null;
        // };
    }, []);

    useEffect(() => {
        if (isRunningThumb) {
            updateTimer();
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunningThumb, totalTime, roundedElapsedTime]);

    const updateTimer = () => {
        startTimeRef.current = Date.now() - elapsedTime;
        intervalIdRef.current = setInterval(() => {
            const currentTime = Date.now();
            const newElapsedTime = currentTime - startTimeRef.current;
            if (roundedElapsedTime >= totalTime * 1000) {
                timelineBlockState.setElapsedTime(0); // Если достигло, сбрасываем таймер на 0

                clearInterval(intervalIdRef.current);
                timelineBlockState.setIsRunningThumb(true);
            } else {
                timelineBlockState.setElapsedTime(newElapsedTime);
            }
        }, 10);
    };



    const handleStartButtonClick = () => {

        timelineBlockState.setIsRunningThumb(!isRunningThumb);
        if(animationToolState.currentTool){
            animationToolState.currentTool.startAnimations(timelineBlockState.isRunningThumb);
        }
    };
    const handleStopButtonClick = () => {
        // clearInterval(intervalIdRef.current);
        timelineBlockState.setIsRunningThumb(false);
        timelineBlockState.setElapsedTime(0);
        if(animationToolState.currentTool){
           animationToolState.currentTool.resetAnimations() 
        }
        
    };

    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time % 1000);
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    return (
        <div className={containerClass}>
            <div className="timeline-player">
                <button className="btn-time-block left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>
                <button className={isRunningThumb ? 'btn-time-block pause-button' : 'btn-time-block play-button'} id="playBtn" onClick={handleStartButtonClick}></button>
            </div>
            <div className="timer">{formatTime(elapsedTime)} </div>
        </div>
    );
});

export default TimelineControls;