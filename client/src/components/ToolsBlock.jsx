import React, {useRef, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Eraser from "../tools/Eraser";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

const ToolsBlock = () => {
    const backgroundNameRef = useRef()
    const [modal,setModal] = useState(false)
    const download = () =>{
        setModal(false)
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        axios.post(`http://localhost:5000/api/v1/backgrounds`, {backgroundName: `${backgroundNameRef.current.value}`, backgroundImage: dataUrl})
            .then(response => console.log(response.data))
    }
    const changeColor = e =>{
        toolState.setFillColor(e.target.value)
        toolState.setFillStroke(e.target.value)
    }
    return (
        <div className="tools-block-container">
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
            <div className="tool-bar-item-title">Tools</div>
            <div className="tool-bar-item">
                <input onChange={e=> changeColor(e)} style={{marginLeft: 10}} type="color"/>
                <button className="tool-bar__btn undo" onClick={()=> canvasState.undo()}/>
                <button className="tool-bar__btn redo" onClick={()=> canvasState.redo()}/>
                <button className="tool-bar__btn eraser" onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
                <button className="tool-bar__btn save" onClick={()=> setModal(true)}/>
            </div>

        </div>
    );
};

export default ToolsBlock;