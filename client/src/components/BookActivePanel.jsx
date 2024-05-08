import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import svgCanvasState from "../store/svgCanvasState";
import animationToolState from "../store/animationToolState";
import pageState from '../store/pageState';
import MotionCurve from '../tools/animation-tools/MotionCurve';
import timelineBlockState from '../store/timelineBlockState';
import TimelineControls from './animation-components/TimelineControls';

const BookActivePanel = () => {
    const pageNameRef = useRef()
    const motionCurveRef = useRef(null);
    const isRunningThumb = timelineBlockState.isRunningThumb
    const [modal,setModal] = useState(false)

    
    useEffect(() => {
        timelineBlockState.setTotalTime(5)
    }, []);

    const download = () =>{
        setModal(false)
       saveSvg()
    }

    const handleMotionCurveClick = () => {
        if (!motionCurveRef.current) {
            motionCurveRef.current = new MotionCurve(svgCanvasState.canvas);
        }
        animationToolState.setAnimationTool(motionCurveRef.current);
       
    };
    const handleStartButtonClick = () => {

        timelineBlockState.setIsRunningThumb(!isRunningThumb);
        
        animationToolState.currentTool.startAnimations(timelineBlockState.isRunningThumb);

    };

    return (
        <div className="action-buttons">
            <Modal className="modal-container" show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header>
                    <Modal.Title>Введите название истории</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <input className="input-modal" type="text" ref={pageNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={()=> download()}>
                        Сохранить историю
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="center-buttons">   
            <button className="action-buttons__btn prev-page">Предыдущая страница</button>
            <button className="action-buttons__btn clear" onClick={svgCanvasState.handleClearCanvas}>Очистить холст</button>       
            <button className="action-buttons__btn next-page">Следующая страница</button>
            </div>
            <div className='right-buttons'>
            <button className="action-buttons__btn add-text" onClick={handleMotionCurveClick}>Движение по пути</button>
            <TimelineControls/>
            <button className="action-buttons__btn add-text">Добавить текст к истории</button>
            <button className="action-buttons__btn save" onClick={()=> setModal(true)}>Сохранить историю</button>
            </div>
        </div>

    );
};

function saveSvg(){
    animationToolState.isAnimationSaved = true
	console.log(JSON.stringify(pageState.backgrounds));
}

export default BookActivePanel;