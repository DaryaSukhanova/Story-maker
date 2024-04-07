import React, {useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import svgCanvasState from "../store/svgCanvasState";
import animationToolState from "../store/animationToolState";
import pageState from '../store/pageState';

const BookActivePanel = () => {
    const [modal,setModal] = useState(false)
    const download = () =>{
        setModal(false)
       saveSvg()
    }
    return (
        <div className="action-buttons">
            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header>
                    <Modal.Title>Введите название истории</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <input type="text" ref={backgroundNameRef}/> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> download()}>
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