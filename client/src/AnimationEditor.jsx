import React from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import SvgCanvas from "./components/SvgCanvas";
import SvgToolbar from "./components/SvgToolbar";
import SvgSettingBar from "./components/SvgSettingBar";
import AnimationSettingBlock from "./components/AnimationSettingBlock";
import './styles/animation-editor.scss'
import DrawingBlock from "./components/DrawingBlock";
import TimelineBlock from "./components/TimelineBlock";
const AnimationEditor = () => {
    return (
        <div className="animation-editor">
            <div className="animation-editor-workspace">
                <DrawingBlock></DrawingBlock>
                <SvgCanvas/>
                <AnimationSettingBlock></AnimationSettingBlock>
            </div>
            <TimelineBlock></TimelineBlock>
        </div>

    );
};

export default AnimationEditor;