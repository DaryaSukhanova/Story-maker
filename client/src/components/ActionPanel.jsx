import React, {useRef, useState} from 'react';
import svgCanvasState from "../store/svgCanvasState";
import {Button, Modal} from "react-bootstrap";
import canvasState from "../store/canvasState";
import axios from "axios";
import toolState from "../store/toolState";
import {logDOM} from "@testing-library/react";

const ActionPanel = () => {
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
        <div className="action-panel-container">
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
            <button className="action-button" onClick={()=> setModal(true)}> Save</button>
            <button className="action-button" onClick={()=>console.log("clear")}>Clear</button>
        </div>
    );
};

export default ActionPanel;