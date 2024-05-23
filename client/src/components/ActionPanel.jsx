import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import canvasState from '../store/canvasState';
import { saveBackground } from '../actions/background';

const ActionPanel = () => {
    const backgroundNameRef = useRef();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('');

    const clearCanvas = () => {
        const canvas = canvasState.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const validateInput = (input) => {
        const validPattern = /^[a-zA-Z0-9-_ ]+$/; // Разрешенные символы: буквы, цифры, дефис, подчеркивание и пробел
        return validPattern.test(input);
    };

    const handleSave = () => {
        const userInput = backgroundNameRef.current.value;
        if (!validateInput(userInput)) {
            setError('Invalid input. Only letters, numbers, hyphens, underscores, and spaces are allowed.');
            return;
        }

        // Очищаем потенциально вредоносные символы
        const sanitizedInput = userInput.replace(/[^a-zA-Z0-9-_ ]/g, '');
        saveBackground(sanitizedInput, () => setModal(false));
    };

    return (
        <div className="action-panel-container">
            <Modal className="modal-container" show={modal} onHide={() => { setModal(false); setError(''); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите название фона</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="input-modal" type="text" ref={backgroundNameRef} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-modal" variant="secondary" onClick={handleSave}>
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
