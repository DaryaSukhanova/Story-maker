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
import pageState from "../../store/pageState";


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
        this.listen()
        this.isRunningThumb = true;
    }
    
    startAnimations(isRunningThumb) {
        this.isRunningThumb = isRunningThumb;
        const element = this.drawingCanvas.findOne('[data-tool="true"]');

        const motionCurveElement = document.getElementById('motionPath');

        // Устанавливаем видимость элемента в зависимости от isRunningThumb
        if (motionCurveElement) {
            motionCurveElement.style.visibility = this.isRunningThumb ? 'hidden' : 'visible';
        }
        // Используем метод `initializeAnimation` из импортированного класса
        if(element){
            this.animationController.initializeAnimation(
                element, 
                this.path, 
                pageState.totalTime, 
                true,
                isRunningThumb,
                timelineBlockState
            ); 
        }

    }

    resetAnimations() {
        this.isRunningThumb = false;
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
            visibility:  'visible'
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
        console.log(pathData)
        // Используем идентификатор активного элемента из хранилища
        // const activeElementId = svgCanvasState.activeElement;
        const element = this.drawingCanvas.findOne('[data-tool="true"]');
        const activeElementId = element.attr('id');

        if (activeElementId) {
            // svgCanvasState.updateElementPath(activeElementId, pathData);
            console.log(svgCanvasState.svgElements)
        } else {
            console.log("No active element set in canvas state.");
        }
    }

}
