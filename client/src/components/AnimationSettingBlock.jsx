import React from 'react';
import '../styles/animation-setting-block.scss'
import animationToolState from "../store/animationToolState";
import MotionCurve from "../tools/MotionCurve";
import svgCanvasState from "../store/svgCanvasState";
import SvgBrush from "../tools/SvgBrush";
import svgToolState from "../store/svgToolState";
const AnimationSettingBlock = () => {
    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="animation-setting-block-title">
                    Animation Settings
                </div>
                 <div className="animation-setting-block-btns">
                     <button className="animation-setting-block-btns__btn motionCurve" onClick={()=> animationToolState.setAnimationTool(new MotionCurve(svgCanvasState.canvas))}/>
                     {/*<button id="pauseButton">Pause</button>*/}
                 </div>
            </div>
        </div>

    );
};

export default AnimationSettingBlock;