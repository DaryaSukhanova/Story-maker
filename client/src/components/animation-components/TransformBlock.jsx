import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import '../../styles/transform-block.scss';
import {logDOM} from "@testing-library/react";
import toolBlockState from "../../store/toolBlockState";

const TransformBlock = observer(() => {
    const [angle, setAngle] = useState(0); // Состояние для хранения значения угла

    const handleAngleChange = (event) => {
        const newAngle = parseFloat(event.target.value);
        setAngle(isNaN(newAngle) ? 0 : newAngle); // Парсим значение в число, если возможно, иначе устанавливаем 0

        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].rotate)
            toolBlockState.keys[activeKeyIndex].rotate = newAngle; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)
    };

    return (
        <div className="transform-block__container">
            <div className="transform-block__title">Transforms</div>
            <div className="transform-block__entry">
                <label htmlFor="angleInput">Angle</label>
                <input
                    type="number"
                    id="angleInput"
                    value={angle}
                    onChange={handleAngleChange}
                    min={0}
                    max={360}
                    step={1}
                />
            </div>

        </div>
    );
});

export default TransformBlock;