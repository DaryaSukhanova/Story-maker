import React, {useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import svgCanvasState from "../store/svgCanvasState";
import { savePage } from '../actions/page';

const BookActivePanel = () => {
    const pageNameRef = useRef()
    const [modal,setModal] = useState(false)

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
                    <Button className="button-modal" variant="secondary" onClick={()=> savePage(pageNameRef, () => setModal(false))}>
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
            <button className="action-buttons__btn add-text">Добавить текст к странице</button>
            <button className="action-buttons__btn save" onClick={()=> setModal(true)}>Сохранить страницу</button>
            </div>
        </div>

    );
};

export default BookActivePanel;