import React, {useRef, useState} from 'react';
import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import {Button, Modal} from "react-bootstrap";
import canvasState from "../../store/canvasState";
import axios from "axios";
import { saveAnimation } from '../../actions/animation';

const SvgActionPanel = () => {
	const animationNameRef = useRef()
	const [modal,setModal] = useState(false)

    return (
        <div className="action-panel-container">
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Enter the name of the animation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <input type="text" ref={animationNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> saveAnimation(animationNameRef, () => setModal(false))}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="action-button" onClick={()=> setModal(true)}>Сохрнаить</button>
            <button className="action-button" onClick={svgCanvasState.handleClearCanvas}>Очистить холст</button>
        </div>
    );
};

export default SvgActionPanel;