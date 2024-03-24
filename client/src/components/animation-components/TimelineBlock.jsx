import React, { useState, useEffect, useRef } from 'react';
import '../../styles/timeline-block.scss';
const TimeLineBlock = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [thumbTime, setThumbTime] = useState(0);

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);
    const timelineRef = useRef(null);
    const thumbEndTimeRef = useRef(null);
    const thumbCurrent = useRef(null);

    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time % 1000);
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalIdRef.current = setInterval(() => {
                const currentTime = Date.now();
                const newElapsedTime = currentTime - startTimeRef.current;

                if (newElapsedTime >= totalTime) {
                    setElapsedTime(0); // Если достигло, сбрасываем таймер на 0
                    clearInterval(intervalIdRef.current);
                    setIsRunning(true);
                } else {
                    setElapsedTime(newElapsedTime);
                }

                // setThumbTime((elapsedTime / 150)*1000);

            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning, elapsedTime, totalTime]);

    const handleStartButtonClick = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        setIsRunning(false);
        setElapsedTime(0);
    };


    const renderTimelineTicks = () => {
        const ticks = [];
        for (let i = 0; i <= 10; i++) {
            const leftPosition = i * 150;
                ticks.push(
                <div key={i} className="tick" style={{ left: `${leftPosition}px` }}>
                    <span style={{marginLeft: 5}}>{i}s</span>

                </div>
            );
            // Добавляем дополнительные метки между основными делениями
            if(i === 10) break
            for (let j = 1; j <= 9; j++) {
                const subTickLeftPosition = leftPosition + j * 15; // Учитываем шаг в 100мс (0.1с * 10)
                ticks.push(
                    <div key={`${i}-${j}`} className="sub-tick" style={{ left: `${subTickLeftPosition}px` }}></div>
                );
            }
        }
        return ticks;
    };
    const handleThumbDragStart = (event) => {
        event.preventDefault();
        setIsRunning(false); // Остановить таймер во время перемещения ползунка
        document.addEventListener('mousemove', handleThumbDrag);
        document.addEventListener('mouseup', handleThumbDragEnd);
    };

    const handleThumbDrag = (event) => {
        const boundingRect = timelineRef.current.getBoundingClientRect();
        const newPosition = event.clientX - boundingRect.left;
        setTotalTime((newPosition / 150)*1000);
        setThumbPosition(newPosition);
        thumbEndTimeRef.current.style.left = `${newPosition}px`;
    };
    const handleThumbDragEnd = () => {
        document.removeEventListener('mousemove', handleThumbDrag);
        document.removeEventListener('mouseup', handleThumbDragEnd);

    };
    return (
        <div className="timeline-block">
            <div className="timeline-player">
                <div >
                    <button className="btn left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>
                    <button className={isRunning ? 'btn pause-button' : 'btn play-button'} id="playBtn" onClick={handleStartButtonClick}></button>
                </div>

                <div className="timer">{formatTime(elapsedTime)} </div>
            </div>
            <div className="timeline" ref={timelineRef} onMouseDown={handleThumbDragStart}>
                {renderTimelineTicks()}
                <div className="thumb-end-time" ref={thumbEndTimeRef} style={{ left: `${thumbPosition}px` }}></div>
                <div className="thumb-current" ref={thumbCurrent} style={{ left: `${((elapsedTime/1000) * 150)}px` }}></div>
            </div>

        </div>
    );
};

export default TimeLineBlock;