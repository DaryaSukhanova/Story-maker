import React from 'react';
import '../../styles/timeline-block.scss';
import {observer} from "mobx-react-lite";
import TimelineControls from "./TimelineControls";
import TimelineTicks from "./TimelineTicks";
import svgCanvasState from "../../store/svgCanvasState";
import TimelineItems from "./TimelineItems";
import timelineBlockState from '../../store/timelineBlockState';

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
    const updateKeysInSvgElement = (elementIndex, updatedKeys) => {
        svgCanvasState.setSvgElements(svgCanvasState.svgElements.map((element, index) => {
            if (index === elementIndex) {
                return {
                    ...element,
                    keys: updatedKeys
                };
            }
            return element;
        }));

    };
    return (
        <div className="timeline-block">
            <TimelineControls variant="default" totalTime={timelineBlockState.totalTime}/>
            <TimelineItems findNearestTickPosition={findNearestTickPosition} updateKeysInSvgElement={updateKeysInSvgElement}/>
            <TimelineTicks findNearestTickPosition={findNearestTickPosition}/>
        </div>
    );
});

export default TimeLineBlock;