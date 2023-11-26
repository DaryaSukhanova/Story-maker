import React, {useEffect, useRef, useState} from 'react';
import "../styles/canvas.scss"
import {observe} from "mobx";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import axios from 'axios'
import {forEach} from "react-bootstrap/ElementChildren";
const Canvas = observer(() => {
    const canvasRef = useRef()
    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
        let ctx = canvasRef.current.getContext('2d')
        axios.get('http://localhost:5000/api/v1/backgrounds')
            .then(response => {
                    const img = new Image()
                    img.src = response.data[response.data.length-1].backgroundImage
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                    }
            })
    }, [])

    const mouseDownHandler = () =>{
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className="canvas">
            <canvas onMouseDown={()=> mouseDownHandler()} ref={canvasRef} width={950} height={544}/>
        </div>
    );
});

export default Canvas;