import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import timelineBlockState from "../../store/timelineBlockState";
import timelineBlock from "./TimelineBlock";
import AnimationManager from "../../tools/animation-tools/AnimationManager";

const TimelineControls = observer( () => {

    const isRunningThumb = timelineBlockState.isRunningThumb
    const roundedElapsedTime = timelineBlockState.roundedElapsedTime
    const [rotationCenter, setRotationCenter] = useState({ x: null, y: null });
    let elapsedTime = timelineBlockState.elapsedTime
    const timelineKeyRef = useRef(null);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRunningThumb) {
            updateTimer();
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunningThumb, timelineBlockState.totalTime, roundedElapsedTime]);

    const updateTimer = () => {
        startTimeRef.current = Date.now() - elapsedTime;
        intervalIdRef.current = setInterval(() => {
            const currentTime = Date.now();
            const newElapsedTime = currentTime - startTimeRef.current;
            if (roundedElapsedTime >= timelineBlockState.totalTime * 1000) {
                timelineBlockState.setElapsedTime(0); // Если достигло, сбрасываем таймер на 0

                clearInterval(intervalIdRef.current);
                timelineBlockState.setIsRunningThumb(true);
            } else {
                timelineBlockState.setElapsedTime(newElapsedTime);
            }
        }, 10);
    };

    const animationManager = new AnimationManager(timelineBlockState.activeElement);

    const handleStartButtonClick = () => {
        timelineBlockState.setIsRunningThumb(!isRunningThumb);
        if (timelineBlockState.activeElement) {
            const rect = timelineBlockState.activeElement.bbox();

            // Получаем границы холста
            const canvasRect = document.getElementById("drawingCanvas").getBoundingClientRect();

            // Вычисляем x и y координаты центральной точки в нижней части границы элемента
            const x = rect.cx;
            const y = rect.y2;

            console.log("Center point coordinates:", x, y);

            // Устанавливаем координаты центральной точки в состояние
            setRotationCenter({ x, y });

            // Запускаем анимации
            animationManager.startAnimations(isRunningThumb, x, y);
        }
    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        timelineBlockState.setIsRunningThumb(false);
        timelineBlockState.setElapsedTime(0);
        // setRoundedElapsedTime(0)
        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
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
        <div className="timeline-controls">
            <div className="timeline-player">
                <button className="btn left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>
                <button className={isRunningThumb ? 'btn pause-button' : 'btn play-button'} id="playBtn" onClick={handleStartButtonClick}></button>
            </div>
            <div className="timer">{formatTime(elapsedTime)} </div>
        </div>
    );
});

export default TimelineControls;