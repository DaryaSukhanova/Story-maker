import React, {useRef, useState} from 'react';
import svgCanvasState from "../store/svgCanvasState";
import animationToolState from "../store/animationToolState";
import {Button, Modal} from "react-bootstrap";
import canvasState from "../store/canvasState";
import axios from "axios";

const SvgActionPanel = () => {
    const [modal,setModal] = useState(false)
    const download = () =>{
        setModal(false)
        saveSvg()
    }

    return (
        <div className="action-panel-container">
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Enter the name of the animation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <input type="text" onChange={(e) => animationToolState.setAnimationName(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> download()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="action-button" onClick={()=> setModal(true)}>Save</button>
            <button className="action-button" onClick={svgCanvasState.handleClearCanvas}>Clear</button>
        </div>
    );
};

function saveSvg(){
    animationToolState.isAnimationSaved = true
}

export default SvgActionPanel;