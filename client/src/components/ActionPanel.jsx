import React, {useRef, useState} from 'react';
import svgCanvasState from "../store/svgCanvasState";
import {Button, Modal} from "react-bootstrap";
import canvasState from "../store/canvasState";
import axios from "axios";
import toolState from "../store/toolState";
import {logDOM} from "@testing-library/react";
import {saveBackground} from "../actions/background";
import layerState from "../store/layerState";

const ActionPanel = () => {

    const backgroundNameRef = useRef()
    const [modal,setModal] = useState(false)



    const clearCanvas = () =>{
        const canvas = canvasState.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="action-panel-container">
            <Modal className="modal-container" show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Введите название фона</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="input-modal" type="text" ref={backgroundNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={()=> saveBackground(backgroundNameRef, () => setModal(false))}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <button id='saveBtnGE' className="action-button" onClick={()=> setModal(true)}> Сохранить</button>
            <button id='clearCanvasBtnGE' className="action-button" onClick={()=>clearCanvas()}>Очистить холст</button>
        </div>
    );
};

export default ActionPanel;