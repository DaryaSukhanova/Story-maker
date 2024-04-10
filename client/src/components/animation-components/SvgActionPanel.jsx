import React, {useRef, useState} from 'react';
import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import {Button, Modal} from "react-bootstrap";
import canvasState from "../../store/canvasState";
import axios from "axios";

const SvgActionPanel = () => {
    const [modal,setModal] = useState(false)
    const download = () =>{
        setModal(false)
        saveSvg()
    }

    return (
        <div className="action-panel-container">
            <Modal className="modal-container" show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Введите название анимации</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <input className="input-modal" type="text" onChange={(e) => animationToolState.setAnimationName(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={()=> download()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="action-button" onClick={()=> setModal(true)}>Сохрнаить</button>
            <button className="action-button" onClick={svgCanvasState.handleClearCanvas}>Очистить холст</button>
        </div>
    );
};

function saveSvg(){
    animationToolState.isAnimationSaved = true
}

export default SvgActionPanel;