import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import '../../styles/transform-block.scss';
import TransformInput from "./TransformInput";
import svgCanvasState from "../../store/svgCanvasState";

const TransformBlock = observer(() => {
    // Локальное состояние для каждого поля ввода
    const [angleDeg, setAngleDeg] = useState(0);
    const [angleTurn, setAngleTurn] = useState(0);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [skewX, setSkewX] = useState(0);
    const [skewY, setSkewY] = useState(0);
    const [origin, setOrigin] = useState("center");

    // Обработчики для обновления состояния
    const handleAngleDeg = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setAngleDeg(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "rotate", value);
        }
    };

    const handleAngleTurn = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            const degrees = value * 360; // 1 поворот = 360 градусов
            setAngleTurn(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "rotate", degrees);
        }
    };

    const handleScaleX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setScaleX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "scaleX", value);
        }
    };

    const handleScaleY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setScaleY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "scaleY", value);
        }
    };

    const handlePositionX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setPositionX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "translateX", value);
        }
    };

    const handlePositionY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setPositionY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "translateY", value);
        }
    };

    const handleSkewX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setSkewX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "skewX", value);
        }
    };

    const handleSkewY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setSkewY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "skewY", value);
        }
    };

    const handleOriginChange = (event) => {
        const newOrigin = event.target.value;
        setOrigin(newOrigin);
        svgCanvasState.updateElementOrigin(svgCanvasState.activeElement, newOrigin);
    };


    const inputFields = [
        [
            { id: "angleInputTurn", label: "Угол", min: 0, max: 10, step: 0.1, type: "turn", onChange1: handleAngleTurn },
            { id: "angleInputDeg", label: "Угол", min: 0, max: 360, step: 1, type: "deg", onChange2: handleAngleDeg},
        ],
        [
            { id: "scaleInputX", label: "Масштаб", step: "0.01", type: "X", onChange1: handleScaleX },
            { id: "scaleInputY", label: "Масштаб", step: "0.01", type: "Y", onChange2: handleScaleY },
        ],
        [
            { id: "positionInputX", label: "Позиция", step: "0.01", type: "X", onChange1: handlePositionX },
            { id: "positionInputY", label: "Позиция", step: "0.01", type: "Y", onChange2: handlePositionY },
        ],
        [
            { id: "skewInputX", label: "Искажение", min: 0, max: 360, step: 1, type: "X", onChange1: handleSkewX },
            { id: "skewInputY", label: "Искажение", min: 0, max: 360, step: 1, type: "Y", onChange2: handleSkewY },
        ]
    ];

    const originOptions = [
        { value: "center", label: "Центр" },
        { value: "top-left", label: "Сверху слева" },
        { value: "top-right", label: "Сверху справа" },
        { value: "bottom-left", label: "Снизу слева" },
        { value: "bottom-right", label: "Снизу справа" }
    ];

    return (
        <div className="transform-block__container">
            <div className="animation-setting-block-title">Трансформация</div>
            <div className="transform-block__options">
                {inputFields.map((input, index) => (
                    <TransformInput
                        key={index}
                        id1={input[0].id}
                        label1={input[0].label}
                        min1={input[0].min}
                        max1={input[0].max}
                        step1={input[0].step}
                        type1={input[0].type}
                        onChange1={input[0].onChange1}
                        id2={input[1].id}
                        label2={input[1].label}
                        min2={input[1].min}
                        max2={input[1].max}
                        step2={input[1].step}
                        type2={input[1].type}
                        onChange2={input[1].onChange2}
                    />
                ))}
            </div>

            <div className="transform-block__entry">
                <label htmlFor="originSelect">Точка трансформации</label>
                <select id="originSelect" value={origin} onChange={handleOriginChange}>
                    {originOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export default TransformBlock;
