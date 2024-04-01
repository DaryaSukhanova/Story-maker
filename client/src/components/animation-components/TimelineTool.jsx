import React, {useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";



const TimelineTool = observer(() => {
    const [keys, setKeys] = useState([])

    const handleAddKeyClick = () => {
        const newKey = {
            id: timelineBlockState.keyCount,
            name: `Key${timelineBlockState.keyCount}`,
            isActive: false,
            position: 0 // Установим начальную позицию для нового ключа
        };
        timelineBlockState.addKey(); // Увеличиваем счетчик ключей в timelineBlockState
        setKeys([...keys, newKey]); // Добавляем новый ключ в состояние
    };

    return (
        <div className="timeline-animation-tool">
            <div className="timeline-animation-tool__title">Keyframes</div>
            <div className="btn-key add"  onClick={handleAddKeyClick}></div>
        </div>
    );
});

export default TimelineTool;