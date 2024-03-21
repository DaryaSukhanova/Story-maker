import React from 'react';
import SvgCanvas from "./components/animation-components/SvgCanvas";
import AnimationSettingBlock from "./components/animation-components/AnimationSettingBlock";
import './styles/animation-editor.scss'
import SvgDrawingBlock from "./components/animation-components/SvgDrawingBlock";
import TimelineBlock from "./components/animation-components/TimelineBlock";
import SvgActionPanel from "./components/animation-components/SvgActionPanel";
const AnimationEditor = () => {
    return (
        <div className="animation-editor">
            <div className="animation-editor-workspace">
                <SvgDrawingBlock></SvgDrawingBlock>
                <SvgCanvas/>
                <AnimationSettingBlock></AnimationSettingBlock>
            </div>
            <SvgActionPanel></SvgActionPanel>
            <TimelineBlock></TimelineBlock>
        </div>

    );
};

export default AnimationEditor;