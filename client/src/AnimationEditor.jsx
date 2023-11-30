import React from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import SvgCanvas from "./components/SvgCanvas";
import SvgToolbar from "./components/SvgToolbar";
import SvgSettingBar from "./components/SvgSettingBar";
import AnimationSettingBlock from "./components/AnimationSettingBlock";
import './styles/animation-editor.scss'
import DrawingBlock from "./components/DrawingBlock";
const AnimationEditor = () => {
    return (
        <div className="animation-editor">
            <DrawingBlock></DrawingBlock>
            <SvgCanvas/>
            <AnimationSettingBlock></AnimationSettingBlock>
            {/*<ButtonSaveSvg></ButtonSaveSvg>*/}

        </div>
    );
};

export default AnimationEditor;