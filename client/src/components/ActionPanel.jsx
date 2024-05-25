import React, { useRef, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import DOMPurify from 'dompurify';
import { saveBackground } from "../actions/background";
import canvasState from '../store/canvasState';

const ActionPanel = () => {
    const backgroundNameRef = useRef();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('');

    const clearCanvas = () => {
        const canvas = canvasState.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const validateBackgroundName = (name) => {
        const sanitizedInput = DOMPurify.sanitize(name);
        const regex = /^[a-zA-Z0-9_-]+$/;
        return regex.test(sanitizedInput) ? sanitizedInput : null;
    };

    const handleSaveBackground = () => {
        const rawInput = backgroundNameRef.current.value;
        const validatedInput = validateBackgroundName(rawInput);

        if (validatedInput) {
            backgroundNameRef.current.value = validatedInput;
            saveBackground(backgroundNameRef, () => setModal(false));
            setError('');
        } else {
            setError('Неверное название. Пожалуйста, убедитесь, что оно содержит только буквы, цифры, дефисы и подчеркивания.');
        }
    };

    return (
        <div className="action-panel-container">
            <Modal className="modal-container" show={modal} onHide={() => { setModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите название фона</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="input-modal" type="text" ref={backgroundNameRef} />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={handleSaveBackground}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <button id='saveBtnGE' className="action-button" onClick={() => setModal(true)}> Сохранить</button>
            <button id='clearCanvasBtnGE' className="action-button" onClick={() => clearCanvas()}>Очистить холст</button>
        </div>
    );
};

export default ActionPanel;
