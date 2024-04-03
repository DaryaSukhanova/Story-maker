import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import '../../styles/transform-block.scss';
import toolBlockState from "../../store/timelineBlockState";
import TransformInput from "./TransformInput";

const TransformBlock = observer(() => {
    const [angle, setAngle] = useState(0); // Состояние для хранения значения угла
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [positionX, setPositionX] = useState(1);
    const [positionY, setPositionY] = useState(1);

    const [skewX, setSkewX] = useState(1);
    const [skewY, setSkewY] = useState(1);

    const handleAngleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        const inputType = event.target.id; // Получаем ID измененного поля ввода
        console.log(inputType)
        // Устанавливаем новое значение в зависимости от типа ввода
        if (inputType === 'angleInputDeg') {
            setAngle(isNaN(newValue) ? 0 : newValue);
        } else if (inputType === 'angleInputTurn') {
            // Переводим повороты в градусы
            const degrees = newValue * 360; // 1 поворот = 360 градусов
            setAngle(isNaN(degrees) ? 0 : degrees);
        }

        // Обновляем состояние активного ключа
        const activeKeyIndex = toolBlockState.keys.findIndex(key => key.isActive);
        if (activeKeyIndex !== -1) {
             // Если угол в градусах, то оставляем newValue, иначе умножаем на 360
            toolBlockState.keys[activeKeyIndex].rotate = (inputType === 'angleInputDeg') ? newValue : newValue * 360;
        }
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

    const inputFields = [
        { id: "angleInputTurn", label: "Angle", min: 0, max: 10, step: 0.1, type: "turn", OnChange: handleAngleChange },
        { id: "angleInputDeg", label: "Angle", min: 0, max: 360, step: 1, type: "deg", OnChange: handleAngleChange },
        { id: "scaleInputX", label: "Scale", step: "0.01", type: "X", OnChange: handleScaleXChange },
        { id: "scaleInputY", label: "Scale", step: "0.01", type: "Y", OnChange: handleScaleYChange },
        { id: "positionInputX", label: "Position", step: "0.01", type: "X", OnChange: handlePositionXChange },
        { id: "positionInputY", label: "Position", step: "0.01", type: "Y", OnChange: handlePositionYChange },
        { id: "skewInputX", label: "Skew", min: 0, max: 360, step: 1, type: "X", OnChange: handleSkewXChange },
        { id: "skewInputY", label: "Skew", min: 0, max: 360, step: 1, type: "Y", OnChange: handleSkewYChange }
    ];

    return (
        <div className="transform-block__container">
            <div className="transform-block__title">Transforms</div>
            <div className="transform-block__options">
                <div className="transform-block__entry">
                    <label htmlFor="angleInput">Angle</label>
                    <div className="transform-block__entry__input">
                        <input
                            type="number"
                            id="angleInputTurn"
                            onChange={handleAngleChange}
                            min={0}
                            max={10}
                            step={0.1}
                        />
                        <span className="transform-block__entry__type">turn</span>
                    </div>

                    <div className="transform-block__entry__input">
                        <input
                            type="number"
                            id="angleInputDeg"
                            onChange={handleAngleChange}
                            min={0}
                            max={360}
                            step={1}
                        />
                        <span className="transform-block__entry__type">deg</span>
                    </div>
                </div>
                <div className="transform-block__entry">
                    <label htmlFor="scaleInput">Scale</label>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="scaleInputX"
                               step="0.01"
                               onChange={handleScaleXChange}
                        />
                        <span className="transform-block__entry__type">X</span>
                    </div>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="scaleInputY"
                               step="0.01"
                               onChange={handleScaleYChange}
                        />
                        <span className="transform-block__entry__type">Y</span>
                    </div>
                </div>
                <div className="transform-block__entry">
                    <label htmlFor="positionInput">Position</label>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="positionInputX"
                               step="0.01"
                               onChange={handlePositionXChange}
                        />
                        <span className="transform-block__entry__type">X</span>
                    </div>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="positionInputY"
                               step="0.01"
                               onChange={handlePositionYChange}
                        />
                        <span className="transform-block__entry__type">Y</span>
                    </div>
                </div>
                <div className="transform-block__entry">
                    <label htmlFor="skewInput">Skew</label>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="skewInputX"
                               min={0}
                               max={360}
                               step={1}
                               onChange={handleSkewXChange}
                        />
                        <span className="transform-block__entry__type">X</span>
                    </div>
                    <div className="transform-block__entry__input">
                        <input type="number"
                               id="skewInputY"
                               min={0}
                               max={360}
                               step={1}
                               onChange={handleSkewYChange}
                        />
                        <span className="transform-block__entry__type">Y</span>
                    </div>
                </div>
            </div>
            {/*<div className="transform-block__options">*/}
            {/*    {inputFields.map(input => (*/}
            {/*        <TransformInput*/}
            {/*            key={input.id}*/}
            {/*            id={input.id}*/}
            {/*            label={input.label}*/}
            {/*            min={input.min}*/}
            {/*            max={input.max}*/}
            {/*            step={input.step}*/}
            {/*            type={input.type}*/}
            {/*            onChange={input.onChange} // Передаем функцию onChange из объекта input*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
});

export default TransformBlock;