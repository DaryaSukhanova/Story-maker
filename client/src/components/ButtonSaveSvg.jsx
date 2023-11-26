import { saveAs } from 'file-saver';
import MovingSquareAnimation from "../tools/MovingSquareAnimation";
import { useEffect, useRef } from "react";

// ...

const ButtonSaveSvg = () => {
    const svgRef = useRef(null);
    const animationRef = useRef(null);


    const handleSaveButtonClick = () => {
        console.log("click")

    };

    return (
        <div className="nav-bar">
            <button onClick={handleSaveButtonClick}>Button</button>
        </div>
    );
};

export default ButtonSaveSvg;
