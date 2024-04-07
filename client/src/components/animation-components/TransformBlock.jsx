import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import '../../styles/transform-block.scss';
import toolBlockState from "../../store/timelineBlockState";
import TransformInput from "./TransformInput";
import svgCanvasState from "../../store/svgCanvasState";
import timelineBlockState from "../../store/timelineBlockState";
import canvasState from "../../store/canvasState";

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

        // Устанавливаем новое значение в зависимости от типа ввода
        if (inputType === 'angleInputDeg') {
            setAngle(isNaN(newValue) ? 0 : newValue);
        } else if (inputType === 'angleInputTurn') {
            // Переводим повороты в градусы
            const degrees = newValue * 360; // 1 поворот = 360 градусов
            setAngle(isNaN(degrees) ? 0 : degrees);
        }
        updateSvgElement(timelineBlockState.activeTimeline, 'rotate', newValue);
    };

    const handleScaleXChange = (event) => {
        const newScaleX = parseFloat(event.target.value);
        setScaleX(isNaN(newScaleX) ? 1 : newScaleX);
        updateSvgElement(timelineBlockState.activeTimeline, 'scaleX', newScaleX);
    };
    const handleScaleYChange = (event) => {
        const newScaleY = parseFloat(event.target.value);
        setScaleY(isNaN(newScaleY) ? 1 : newScaleY);
        updateSvgElement(timelineBlockState.activeTimeline, 'scaleY', newScaleY);
    };

    const handlePositionXChange = (event) => {
        const newPositionX = parseFloat(event.target.value);
        setPositionX(isNaN(newPositionX) ? 1 : newPositionX);
        updateSvgElement(timelineBlockState.activeTimeline, 'translateX', newPositionX);

    };
    const handlePositionYChange = (event) => {
        const newPositionY = parseFloat(event.target.value);
        setPositionY(isNaN(newPositionY) ? 1 : newPositionY);
        updateSvgElement(timelineBlockState.activeTimeline, 'translateY', newPositionY);
    };

    const handleSkewXChange = (event) => {
        const newSkewX = parseFloat(event.target.value);
        setPositionX(isNaN(newSkewX) ? 1 : newSkewX);
        updateSvgElement(timelineBlockState.activeTimeline, 'skewX', newSkewX);
    };

    const handleSkewYChange = (event) => {
        const newSkewY = parseFloat(event.target.value);
        setPositionX(isNaN(newSkewY) ? 1 : newSkewY);
        updateSvgElement(timelineBlockState.activeTimeline, 'skewY', newSkewY);
    };
    const updateSvgElement = (elementIndex, field, value) => {
        svgCanvasState.setSvgElements(svgCanvasState.svgElements.map((element, index) => {
            if (index === elementIndex) {
                // Поиск активного ключа в массиве keys
                const updatedKeys = element.keys.map(key => {
                    if (key.isActive) {
                        // Если ключ активный, обновляем поле field
                        return {
                            ...key,
                            [field]: value
                        };
                    }
                    return key;
                });

                // Возвращаем обновленный элемент
                return {
                    ...element,
                    keys: updatedKeys
                };
            }
            return element;
        }));
    };

        const inputFields = [
            [
                { id: "angleInputTurn", label: "Angle", min: 0, max: 10, step: 0.1, type: "turn", OnChange: handleAngleChange },
                { id: "angleInputDeg", label: "Angle", min: 0, max: 360, step: 1, type: "deg", OnChange: handleAngleChange },
            ],
            [
                { id: "scaleInputX", label: "Scale", step: "0.01", type: "X", OnChange: handleScaleXChange },
                { id: "scaleInputY", label: "Scale", step: "0.01", type: "Y", OnChange: handleScaleYChange },
            ],
            [
                { id: "positionInputX", label: "Position", step: "0.01", type: "X", OnChange: handlePositionXChange },
                { id: "positionInputY", label: "Position", step: "0.01", type: "Y", OnChange: handlePositionYChange },
            ],
            [
                { id: "skewInputX", label: "Skew", min: 0, max: 360, step: 1, type: "X", OnChange: handleSkewXChange },
                { id: "skewInputY", label: "Skew", min: 0, max: 360, step: 1, type: "Y", OnChange: handleSkewYChange }
            ]
        ];

    return (
        <div className="transform-block__container">
            <div className="animation-setting-block-title">Transforms</div>
            <div className="transform-block__options">
                {inputFields.map((input, index) => (
                    <TransformInput
                        key={index} // Уникальный ключ
                        id1={input[0].id}
                        label1={input[0].label}
                        min1={input[0].min}
                        max1={input[0].max}
                        step1={input[0].step}
                        type1={input[0].type}
                        onChange1= {input[0].OnChange}
                        id2={input[1].id}
                        label2={input[1].label}
                        min2={input[1].min}
                        max2={input[1].max}
                        step2={input[1].step}
                        type2={input[1].type}
                        onChange2={input[1].OnChange}
                    />
                ))}
            </div>
        </div>
    );
});

export default TransformBlock;