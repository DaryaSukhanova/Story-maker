import React from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import SvgCanvas from "./components/SvgCanvas";
import ButtonSaveSvg from "./components/ButtonSaveSvg";
import SvgToolbar from "./components/SvgToolbar";
import SvgSettingBar from "./components/SvgSettingBar";

const AnimationEditor = () => {
    return (
        <div className="animation-editor">
            <SvgToolbar></SvgToolbar>
            <SvgSettingBar></SvgSettingBar>
            <SvgCanvas/>
            {/*<ButtonSaveSvg></ButtonSaveSvg>*/}

        </div>
    );
};

export default AnimationEditor;