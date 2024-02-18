import React, {useRef, useState} from 'react';
import "../styles/toolbar.scss"
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import Circle from "../tools/Cirlcle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import canvas from "./Canvas";
import Canvas from "./Canvas";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Scratch from "../tools/Scratch";
import Bubbles from "../tools/Bubbles";
import Pencil from "../tools/Pencil";
import BrushBlock from "./BrushBlock";
import FiguresBlock from "./FiguresBlock";
import ToolsBlock from "./ToolsBlock";
const Toolbar = () => {
    const backgroundNameRef = useRef()
    const [modal,setModal] = useState(false)
    const download = () =>{
        setModal(false)
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        axios.post(`http://localhost:5000/api/v1/backgrounds`, {backgroundName: `${backgroundNameRef.current.value}`, backgroundImage: dataUrl})
            .then(response => console.log(response.data))
    }

    return (
        <div className="tool-bar">
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Enter the name of the background</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={backgroundNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> download()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <BrushBlock></BrushBlock>
            <FiguresBlock></FiguresBlock>
            <ToolsBlock></ToolsBlock>

        </div>
    );
};

export default Toolbar;