import React, {useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";
import {logDOM} from "@testing-library/react";
import svgCanvasState from "../../store/svgCanvasState";



const TimelineTool = observer(({toolType, keyframesKeys, onAddKey }) => {
    // const [keys, setKeys] = useState([])
    const [keyCount, setKeyCount] = useState(0);

    const handleAddKeyClick = () => {
        const newKey = {
            id: keyCount,
            name: `Key${keyCount}`,
            isActive: false,
            position: 0,
            duration: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            skewX: 0,
            skewY: 0
        };
        setKeyCount(keyCount + 1); // Увеличиваем счетчик ключей
        onAddKey(newKey);

        // timelineBlockState.addKey(); // Увеличиваем счетчик ключей в timelineBlockState
        // setKeys([...keys, newKey]); // Добавляем новый ключ в состояние
    };

    return (
        <div className="timeline-animation-tool">
            <div className="timeline-animation-tool__title">{toolType}</div>
            <div className="btn-key add"  onClick={handleAddKeyClick}></div>
        </div>
    );
});

export default TimelineTool;