import React from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/animation-tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import svgToolState from "../../store/svgToolState";
import KeyFrames from "../../tools/animation-tools/KeyFrames";
import {observer} from "mobx-react-lite";
import TransformBlock from "./TransformBlock";
import toolBlockState from "../../store/timelineBlockState";

const AnimationSettingBlock = observer(() => {
    const handleMotionCurveClick = () => {
        const motionCurveTool = new MotionCurve(svgCanvasState.canvas);
        animationToolState.setAnimationTool(motionCurveTool);
    };

    const handleRotateClick = () => {
        const rotateElementTool = new KeyFrames(svgCanvasState.canvas);
        animationToolState.setAnimationTool(rotateElementTool);
    };

    // Определяем, какой инструмент анимации сейчас выбран
    let selectedToolContent = null;
    if (animationToolState.tool instanceof MotionCurve) {
        selectedToolContent = <div>Содержимое для MotionCurve</div>;
    } else if (animationToolState.tool instanceof KeyFrames) {
        selectedToolContent = <TransformBlock/>
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
                <div className="animation-setting-block-data">
                    {selectedToolContent}
                </div>
            </div>
        </div>
    );
});

export default AnimationSettingBlock;
