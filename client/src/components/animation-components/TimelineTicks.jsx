import React, {useRef, useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";

const TimelineTicks = observer(({findNearestTickPosition}) => {

    const [isEndThumb, setIsEndThumb] = useState(false);
    const thumbPosition = timelineBlockState.thumbEndPosition

    const timelineRef = useRef(null);
    const thumbPositionRef = useRef(null);
    const thumbEndTimeRef = useRef(null);
    const handleThumbDragStart = (event) => {
        event.preventDefault();
        setIsEndThumb(true)
    };
    const handleThumbDrag = (event) => {
        if(isEndThumb){
            const boundingRect = timelineRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Найдем ближайшее деление времени
            const nearestTickPosition = findNearestTickPosition(newPosition);
            // Установим позицию ползунка в ближайшем делении времени
            thumbEndTimeRef.current.style.left = `${nearestTickPosition}px`;
            thumbPositionRef.current = nearestTickPosition; // Обновляем значение ref
            timelineBlockState.setThumbEndPosition(nearestTickPosition); // Обновляем состояние позиции ползунка
            timelineBlockState.setTotalTime(nearestTickPosition / 150);

            console.log(thumbPosition)
        }

    };

    const handleThumbDragEnd = () => {
        setIsEndThumb(false)
        document.removeEventListener('mousemove', handleThumbDrag);
        document.removeEventListener('mouseup', handleThumbDragEnd);

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

    return (
        <div className="timeline-ticks" ref={timelineRef}
             onMouseDown={handleThumbDragStart}
             onMouseMove={handleThumbDrag}
             onMouseUp={handleThumbDragEnd}>
            {renderTimelineTicks()}
            <div className="thumb-end-time" ref={thumbEndTimeRef} style={{ left: `${thumbPosition}px` }}></div>
            <svg className="thumb-current-head" width="10" height="15" xmlns="http://www.w3.org/2000/svg" style={{ transform: `translateX(${timelineBlockState.roundedElapsedTime * (150 / 1000)-4}px)` }} >
                <polygon points="0,0 10,0 10,10 5,15 0,10" fill="white" />
            </svg>
        </div>
    );
});

export default TimelineTicks;