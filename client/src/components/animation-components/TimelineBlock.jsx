import React, {useEffect, useRef, useState} from 'react';
import '../../styles/timeline-block.scss';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";
import TimelineControls from "./TimelineControls";
import animationToolState from "../../store/animationToolState";
import TimelineLine from "./TimelineLine";
import TimelineTool from "./TimelineTool";
import TimelineTicks from "./TimelineTicks";
import TimelineKeyframes from "./TimelineKeyframes";

const TimeLineBlock = observer (() => {

    const findNearestTickPosition = (position) => {
        const ticksPositions = [];
        for (let i = 0; i <= 10; i++) {
            ticksPositions.push(i * 150); // Добавляем позиции каждого деления времени
            // Добавляем позиции каждого подделения времени
            for (let j = 1; j <= 9; j++) {
                ticksPositions.push(i * 150 + j * 15);
            }
        }

        // Находим ближайшее деление времени к текущей позиции ползунка
        return ticksPositions.reduce((prev, curr) => {
            return (Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev);
        });
    };

    return (
        <div className="timeline-block">
            <div className="timeline-left">
                <TimelineControls/>
                {animationToolState.tool === 'keyframeElement' && (
                    <TimelineTool/>
                )}
            </div>
            <div className="timeline-right" >
                <TimelineTicks findNearestTickPosition={findNearestTickPosition}/>
                <TimelineKeyframes findNearestTickPosition={findNearestTickPosition}/>
            </div>


        </div>
    );
});

export default TimeLineBlock;