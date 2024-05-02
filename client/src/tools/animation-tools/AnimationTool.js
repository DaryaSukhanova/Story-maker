import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentSpeed = 20;
        this.mouseDown = false; // Добавляем состояние для отслеживания нажатия кнопки мыши

        this.destroyEvents();
    }

    listen() {
        // Привязываем обработчики событий mousedown и mouseup
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown){

        }
        console.log('MouseMove Event');
    }

    mouseDownHandler(e) {
        console.log('MouseDown Event');
        this.mouseDown = true; // Устанавливаем флаг нажатия кнопки мыши
        // Добавляем слушатель mousemove только после нажатия кнопки мыши
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e) {
        console.log('MouseUp Event');
        this.mouseDown = false; // Сбрасываем флаг нажатия кнопки мыши
        // Удаляем слушатель mousemove, так как кнопка мыши отпущена
        this.svgCanvas.onmousemove = null;
    }

    destroyEvents() {
        // Обеспечиваем, что все обработчики событий очищены при уничтожении инструмента
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;
    }

    set animationSpeed(speed) {
        this.currentSpeed = speed;
    }

    set animationName(name) {
        this.currentName = name;
    }
}