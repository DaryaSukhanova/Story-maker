import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import timelineBlockState from "../../store/timelineBlockState";
import timelineBlock from "./TimelineBlock";

const TimelineControls = observer( () => {
    // const [elapsedTime, setElapsedTime] = useState(timelineBlockState.elapsedTime);
    const [isRunningThumb, setIsRunningThumb] = useState(false);
    // const isRunningThumb = timelineBlockState.isRunningThumb
    // const [totalTime, setTotalTime] = useState(0);
    const [rotationCenter, setRotationCenter] = useState({ x: null, y: null });

    const timelineKeyRef = useRef(null);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRunningThumb) {
            startTimeRef.current = Date.now() - timelineBlockState.elapsedTime;
            intervalIdRef.current = setInterval(() => {
                const currentTime = Date.now();
                const newElapsedTime = currentTime - startTimeRef.current;
                // console.log(timelineBlockState.elapsedTime)
                // if (newElapsedTime >= timelineBlockState.totalTime) {
                //     timelineBlockState.setElapsedTime(0);
                //     setElapsedTime(timelineBlockState.elapsedTime)
                //     clearInterval(intervalIdRef.current);

                // } else {
                    timelineBlockState.setElapsedTime(newElapsedTime);
                    // setElapsedTime(timelineBlockState.elapsedTime)
                // }
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);

    }, [isRunningThumb, timelineBlockState.elapsedTime]);

    const handleStartButtonClick = () => {
        setIsRunningThumb(!isRunningThumb)
        startAnimations()
    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        timelineBlockState.setIsRunningThumb(false);
        timelineBlockState.setElapsedTime(0);
    };
    const startAnimations = () => {
        const selectedElement = timelineBlockState.activeElement;
        if (selectedElement) {
            applyRotationAnimationStyle(selectedElement);
            selectedElement.style.animationName = 'rotatePath';
            selectedElement.style.animationDuration = `${timelineBlockState.totalTime/1000}s`;
            selectedElement.style.animationIterationCount = 'infinite';
            selectedElement.style.animationPlayState = isRunningThumb ? 'paused' : 'running'; // Устанавливаем состояние анимации в зависимости от значения isRunningThumb
        }
    };

    const applyRotationAnimationStyle = (element) => {
        const rect = element.getBoundingClientRect();
        const canvasRect = document.getElementById("drawingCanvas").getBoundingClientRect();
        const x = rotationCenter.x !== null ? rotationCenter.x : rect.left - canvasRect.left + rect.width / 2;
        const y = rotationCenter.y !== null ? rotationCenter.y : rect.top - canvasRect.top + rect.height;

        setRotationCenter({ x, y });

        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
        }

        // Создание нового элемента <style>
        const style = document.createElement('style');
        style.setAttribute('data-animation', 'rotatePath');
        style.textContent = `
        @keyframes rotatePath {
            0% {
                transform-origin: ${x}px ${y}px;
                transform: rotate(${timelineBlockState.keys[0].rotate}deg);
            }
            100% {
                transform-origin: ${x}px ${y}px;
                transform: rotate(${timelineBlockState.keys[1].rotate}deg);
            }
        }
    `;
        document.head.appendChild(style);
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
            <div className="timer">{formatTime(timelineBlockState.elapsedTime)} </div>
        </div>
    );
});

export default TimelineControls;