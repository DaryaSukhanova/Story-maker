import React, { useEffect, useRef, useState } from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/animation-tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import { observer } from "mobx-react-lite";
import TransformBlock from "./TransformBlock";
import KeyFrameManager from "../../tools/animation-tools/KeyFrameManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AnimationSettingBlock = observer(() => {
    const motionCurveRef = useRef(null);
    const keyFrameManagerRef = useRef(null);
    const [activeTool, setActiveTool] = useState(null); // состояние для отслеживания активного инструмента

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleMotionCurveClick = () => {
        if (!motionCurveRef.current) {
            motionCurveRef.current = new MotionCurve(svgCanvasState.canvas);
        }
        animationToolState.setAnimationTool(motionCurveRef.current);
        setActiveTool('motionCurve'); // Установка активного инструмента
    };

    const handleKeyframeClick = () => {
        if (!keyFrameManagerRef.current) {
            keyFrameManagerRef.current = new KeyFrameManager(svgCanvasState.canvas);
        }
        animationToolState.setAnimationTool(keyFrameManagerRef.current);
        setActiveTool('keyframe'); // Установка активного инструмента
    };

    let selectedToolContent;
    if (animationToolState.currentTool instanceof KeyFrameManager) {
        selectedToolContent = <TransformBlock />;
    } else {
        // selectedToolContent = <div>Выберите инструмент анимации</div>;
        selectedToolContent = <TransformBlock />;
    }

    return (
        <div className={` ${isVisible ? 'block-container' : 'hidden-block'}`}>
            <div className={`setting-block ${isVisible ? '' : 'hidden'}`}>
                <div>
                    <div className="animation-setting-block-title">
                        Настройки анимации
                    </div>
                    <div className="animation-setting-block-btns">
                        <button
                            className={`animation-setting-block-btns__btn ${activeTool === 'keyframe' ? 'activeAnimBtn' : ''}`}
                            id='frameActivationBtn'
                            onClick={handleKeyframeClick}> 
                                Ключевые кадры
                        </button>
                    </div>
                    <div className="animation-setting-block-data">
                        {selectedToolContent}
                    </div>
                </div>
            </div>
            <button id="toggleButtonRight" className="icon-button right" onClick={toggleVisibility}>
                <FontAwesomeIcon 
                icon={faChevronRight} 
                style={{ color: "#e0e0e0", transform: isVisible ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
            </button>
        </div>
    );
});

export default AnimationSettingBlock;