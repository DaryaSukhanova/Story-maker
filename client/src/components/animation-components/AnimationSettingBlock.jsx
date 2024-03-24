import React from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/animation-tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import svgToolState from "../../store/svgToolState";
import RotateElement from "../../tools/animation-tools/RotateElement";
import {observer} from "mobx-react-lite";

const AnimationSettingBlock = observer(() => {
    const handleMotionCurveClick = () => {
        const motionCurveTool = new MotionCurve(svgCanvasState.canvas);
        animationToolState.setAnimationTool(motionCurveTool);
    };

    const handleRotateClick = () => {
        const rotateElementTool = new RotateElement(svgCanvasState.canvas);
        animationToolState.setAnimationTool(rotateElementTool);
    };

    // Определяем, какой инструмент анимации сейчас выбран
    let selectedToolContent = null;
    if (animationToolState.tool instanceof MotionCurve) {
        selectedToolContent = <div>Содержимое для MotionCurve</div>;
    } else if (animationToolState.tool instanceof RotateElement) {
        selectedToolContent = <div>Содержимое для RotateElement</div>;
    }

    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="animation-setting-block-title">
                    Animation Settings
                </div>
                <div className="animation-setting-block-btns">
                    <button className="animation-setting-block-btns__btn motionCurve" onClick={handleMotionCurveClick} />
                    <button className="animation-setting-block-btns__btn rotateElement" onClick={handleRotateClick} />
                </div>
                <div>
                    {selectedToolContent}
                </div>
            </div>
        </div>
    );
});

export default AnimationSettingBlock;
