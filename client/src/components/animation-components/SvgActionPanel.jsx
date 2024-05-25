import React, {useRef, useState} from 'react';
import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import {Button, Modal} from "react-bootstrap";
import DOMPurify from 'dompurify';
import { saveAnimation } from '../../actions/animation';

const SvgActionPanel = () => {
	const animationNameRef = useRef()
	const [modal,setModal] = useState(false)
    const [error, setError] = useState('');

    const validateBackgroundName = (name) => {
        const sanitizedInput = DOMPurify.sanitize(name);
        const regex = /^[a-zA-Z0-9_-]+$/;
        return regex.test(sanitizedInput) ? sanitizedInput : null;
    };

    const handleSaveAnimation = () => {
        const rawInput = animationNameRef.current.value;
        const validatedInput = validateBackgroundName(rawInput);

        if (validatedInput) {
            animationNameRef.current.value = validatedInput;
            saveAnimation(animationNameRef, () => setModal(false));
            setError('');
        } else {
            setError('Неверное название. Пожалуйста, убедитесь, что оно содержит только буквы, цифры, дефисы и подчеркивания.');
        }
    };
    return (
        <div className="action-panel-container">
            <Modal className="modal-container" show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton >
                    <Modal.Title>Введите название анимации</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <input className="input-modal" type="text" ref={animationNameRef}/>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={handleSaveAnimation}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <button id='saveBtnAE' className="action-button" onClick={()=> setModal(true)}>Сохранить</button>
            <button id='clearCanvasBtnAE' className="action-button" onClick={svgCanvasState.handleClearCanvas}>Очистить холст</button>
        </div>
    );
};

export default SvgActionPanel;