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
    const changeColor = e =>{
        toolState.setFillColor(e.target.value)
        toolState.setFillStroke(e.target.value)
    }

    return (
        <div className="tool-bar">
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Введите название фона</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={backgroundNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> download()}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="tool-bar__btn brush" onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}/>
            <button className="tool-bar__btn scratch" onClick={()=> toolState.setTool(new Scratch(canvasState.canvas))}/>
            <button className="tool-bar__btn bubbles" onClick={()=> toolState.setTool(new Bubbles(canvasState.canvas))}/>
            <button className="tool-bar__btn pencil" style={{marginRight: 10}} onClick={()=> toolState.setTool(new Pencil(canvasState.canvas))}/>
            <button className="tool-bar__btn rect" onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className="tool-bar__btn circle" onClick={()=> toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className="tool-bar__btn eraser" onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className="tool-bar__btn line" onClick={()=> toolState.setTool(new Line(canvasState.canvas))}/>
            <input onChange={e=> changeColor(e)} style={{marginLeft: 10}} type="color"/>
            <button className="tool-bar__btn undo" onClick={()=> canvasState.undo()}/>
            <button className="tool-bar__btn redo" onClick={()=> canvasState.redo()}/>
            <button className="tool-bar__btn save" onClick={()=> setModal(true)}/>
        </div>
    );
};

export default Toolbar;