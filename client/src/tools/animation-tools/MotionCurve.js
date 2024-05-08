import AnimationTool from "./AnimationTool";
import axios from "axios";
import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";
import svgCanvas from "../../components/animation-components/SvgCanvas";
import canvasState from "../../store/canvasState";
import svgCanvasState from "../../store/svgCanvasState";

import {SVG} from "@svgdotjs/svg.js";
import timelineBlockState from "../../store/timelineBlockState";
import AnimationMotionCurveController from "./AnimationMotionCurveController";


export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // this.pathData = "";
        this.path = null;
         // Переменная для отслеживания пройденного расстояния
         // Длина пути
        this.speed = 2; // Скорость анимации
        this.requestId = null;
        this.drawingCanvas = SVG(document.getElementById("drawingCanvas"))
        this.arrPath = []
        this.distanceCovered = 0;
        svgToolState.clearBoundingBox()

        this.animationController = new AnimationMotionCurveController();

    }

    initializeAnimation(element, path, duration, useFlag = true) {
        const pathLength = path.length(); // Общая длина пути
        let startTime = null; // Время начала текущего цикла анимации
    
        // Проверка корректности параметров
        if (!element || !path || !path.length()) return;
        if (duration <= 0) {
            console.error('Animation duration must be greater than zero');
            return;
        }
    
        const pixelsPerMs = pathLength / (duration * 1000); // Скорость движения в пикселях за миллисекунду
    
        // Функция анимации
        const animate = (timestamp) => {
            // Проверяем флаг `this.isRunningThumb`, если `useFlag` активен
            if (useFlag && !this.isRunningThumb) {
                startTime = null; 
                return; 
            }
    
            // Устанавливаем начальное время или корректируем его после паузы
            if (startTime === null) {
                startTime = timestamp;
            }
    
            // Рассчитываем прошедшее время с момента начала текущего цикла
    
            let elapsedTime;
            if (useFlag) {
                elapsedTime = timelineBlockState.elapsedTime;
            } else {
                elapsedTime = timestamp - startTime;
            }
    
            // Рассчитываем новое расстояние с учетом сохраненного
            this.distanceCovered = elapsedTime * pixelsPerMs ;
            console.log(this.distanceCovered, pathLength)
            // Обеспечиваем цикличность анимации
            if (this.distanceCovered >= pathLength) {
                console.log('Animation completed, restarting...');
                this.distanceCovered = this.distanceCovered % pathLength; // Перезапускаем движение с начала
                startTime = timestamp; // Перезапускаем отсчёт времени
            }
    
            // Перемещаем элемент
            const point = path.pointAt(this.distanceCovered);
            if (element) {
                element.center(point.x, point.y);
            }
    
            // Запланировать следующий кадр
            this.requestId = requestAnimationFrame(animate);
        };
    
        // Отменяем предыдущий кадр, если он запланирован
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    
        // Запускаем анимацию
        this.requestId = requestAnimationFrame(animate);
    }
    
    startAnimations(isRunningThumb) {
        this.isRunningThumb = isRunningThumb;
        const element = this.drawingCanvas.findOne('[data-tool="true"]');

        // Используем метод `initializeAnimation` из импортированного класса
        this.animationController.initializeAnimation(
            element, 
            this.path, 
            timelineBlockState.totalTime, 
            true, 
            isRunningThumb, 
            timelineBlockState
        );
    }

    resetAnimations() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId); // Отменяем текущую анимацию
            this.requestId = null;
        }
        this.distanceCovered = 0; // Сброс пройденного расстояния

        if (this.path) {
            const startPoint = this.path.pointAt(0); // Получаем начальную точку пути
            const element = this.drawingCanvas.findOne('[data-tool="true"]');
            if (element) {
                element.center(startPoint.x, startPoint.y); // Перемещаем элемент на начальную точку
            }
        }

        console.log("Animations reset and element moved to the start position");
    }
    mouseDownHandler(e) {
        super.mouseDownHandler(e)
        const existingPath = this.drawingCanvas.findOne('#motionPath');
        if (existingPath) {
            existingPath.remove();  // Удаление существующего пути
        }
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;
        this.path = this.drawingCanvas.path(`M${startX},${startY}`)
            .stroke({
                color: '#8DADFF',
                width: 2,
                linecap: 'round',
                linejoin: 'round'
            })
            .fill('none');
        this.path.attr({
            id: 'motionPath',
            visibility: 'visible'
        });

    }
    //
    mouseMoveHandler(e) {
        if (this.path && this.mouseDown) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;
            // this.pathData += ` L ${currentX} ${currentY}`;
            // this.updatePath();
            const d = this.path.attr('d');
            this.path.plot(d + ` L${currentX},${currentY}`);
        }
    }

    mouseUpHandler(e) {
        super.mouseUpHandler(e);

        const pathData = this.path.attr('d');

        // Используем идентификатор активного элемента из хранилища
        const activeElementId = svgCanvasState.activeElement;
        if (activeElementId) {
            svgCanvasState.updateElementPath(activeElementId, pathData);
            console.log(svgCanvasState.svgElements)
        } else {
            console.log("No active element set in canvas state.");
        }
    }

}
