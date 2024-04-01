import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import '../../styles/transform-block.scss';
import {logDOM} from "@testing-library/react";
import toolBlockState from "../../store/timelineBlockState";

const TransformBlock = observer(() => {
    const [angle, setAngle] = useState(0); // Состояние для хранения значения угла
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [positionX, setPositionX] = useState(1);
    const [positionY, setPositionY] = useState(1);

    const [skewX, setSkewX] = useState(1);
    const [skewY, setSkewY] = useState(1);

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

    const handleScaleXChange = (event) => {
        const newScaleX = parseFloat(event.target.value);
        setScaleX(isNaN(newScaleX) ? 1 : newScaleX);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].scaleX)
            toolBlockState.keys[activeKeyIndex].scaleX = newScaleX; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };
    const handleScaleYChange = (event) => {
        const newScaleY = parseFloat(event.target.value);
        setScaleY(isNaN(newScaleY) ? 1 : newScaleY);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].scaleY)
            toolBlockState.keys[activeKeyIndex].scaleY = newScaleY; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };

    const handlePositionXChange = (event) => {
        const newPositionX = parseFloat(event.target.value);
        setPositionX(isNaN(newPositionX) ? 1 : newPositionX);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].translateX)
            toolBlockState.keys[activeKeyIndex].translateX = newPositionX; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };
    const handlePositionYChange = (event) => {
        const newPositionY = parseFloat(event.target.value);
        setPositionY(isNaN(newPositionY) ? 1 : newPositionY);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].translateX)
            toolBlockState.keys[activeKeyIndex].translateY = newPositionY; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };

    const handleSkewXChange = (event) => {
        const newSkewX = parseFloat(event.target.value);
        setPositionX(isNaN(newSkewX) ? 1 : newSkewX);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].skewX)
            toolBlockState.keys[activeKeyIndex].skewX = newSkewX; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };

    const handleSkewYChange = (event) => {
        const newSkewY = parseFloat(event.target.value);
        setPositionX(isNaN(newSkewY) ? 1 : newSkewY);
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive); // Находим индекс активного ключа
        if (activeKeyIndex !== -1) {
            console.log(toolBlockState.keys[activeKeyIndex].skewY)
            toolBlockState.keys[activeKeyIndex].skewY = newSkewY; // Присваиваем новое значение угла в поле rotate активного ключа
        }
        console.log(toolBlockState.keys)

    };

    return (
        <div className="transform-block__container">
            <div className="transform-block__title">Transforms</div>
            <div className="transform-block__options">
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
                <div className="transform-block__entry">
                    <label htmlFor="scaleInput">Scale</label>
                    <input type="number"
                           id="scaleInputX"
                           step="0.01"
                           onChange={handleScaleXChange}
                    />
                    <input type="number"
                           id="scaleInputY"
                           step="0.01"
                           onChange={handleScaleYChange}
                    />
                </div>
                <div className="transform-block__entry">
                    <label htmlFor="scaleInput">Position</label>
                    <input type="number"
                           id="positionInputX"
                           step="0.01"
                           onChange={handlePositionXChange}
                    />
                    <input type="number"
                           id="positionInputY"
                           step="0.01"
                           onChange={handlePositionYChange}
                    />
                </div>
                <div className="transform-block__entry">
                    <label htmlFor="scaleInput">Skew</label>
                    <input type="number"
                           id="skewInputX"
                           min={0}
                           max={360}
                           step={1}
                           onChange={handleSkewXChange}
                    />
                    <input type="number"
                           id="skewInputY"
                           min={0}
                           max={360}
                           step={1}
                           onChange={handleSkewYChange}
                    />
                </div>
            </div>
        </div>
    );
});

export default TransformBlock;