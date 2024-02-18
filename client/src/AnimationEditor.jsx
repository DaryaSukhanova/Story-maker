import React from 'react';
import SvgCanvas from "./components/SvgCanvas";
import AnimationSettingBlock from "./components/AnimationSettingBlock";
import './styles/animation-editor.scss'
import SvgDrawingBlock from "./components/SvgDrawingBlock";
import TimelineBlock from "./components/TimelineBlock";
import ActionPanel from "./components/ActionPanel";
const AnimationEditor = () => {
    return (
        <div className="animation-editor">
            <div className="animation-editor-workspace">
                <SvgDrawingBlock></SvgDrawingBlock>
                <SvgCanvas/>
                <AnimationSettingBlock></AnimationSettingBlock>
            </div>
            <ActionPanel></ActionPanel>
            <TimelineBlock></TimelineBlock>
        </div>

    );
};

export default AnimationEditor;