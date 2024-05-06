import AnimationTool from "./AnimationTool";
import axios from "axios";
import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";
import svgCanvas from "../../components/animation-components/SvgCanvas";
import canvasState from "../../store/canvasState";
import svgCanvasState from "../../store/svgCanvasState";

import {SVG} from "@svgdotjs/svg.js";
import timelineBlockState from "../../store/timelineBlockState";


let distanceCovered = null
let isAnimationSaved = animationToolState.isAnimationSaved;
let isUpdateTime = true

export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // this.pathData = "";
        this.path = null;
        this.distanceCovered = 0; // Переменная для отслеживания пройденного расстояния
        this.pathLength = 0; // Длина пути
        this.speed = 2; // Скорость анимации
        this.requestId = null; // ID для отслеживания requestAnimationFrame
        this.drawingCanvas = SVG(document.getElementById("drawingCanvas"))
        this.arrPath = []
        svgToolState.clearBoundingBox()

    }

    startAnimations(isRunningThumb) {
        this.isRunningThumb = isRunningThumb;

        if (!this.path || !this.path.length()) return; // Если путь не определен или его длина равна нулю, выходим из функции

        this.pathLength = this.path.length(); // Получаем длину пути
        
        if (timelineBlockState.totalTime  <= 0) {
            console.error('Animation duration must be greater than zero');
            return;
        }
        const pixelsPerMs = this.pathLength / (timelineBlockState.totalTime * 1000); // Скорость движения по пути в пикселях за миллисекунду

        const animate = () => {
            if (!this.isRunningThumb) {
                console.log('Animation paused at distance:', this.distanceCovered);
                return; // Прекращаем анимацию, если флаг опущен
            }

            // Пройденное расстояние = прошедшее время * скорость
            this.distanceCovered = timelineBlockState.elapsedTime * pixelsPerMs;

            if (this.distanceCovered >= this.pathLength) {
                console.log('Animation completed, restarting...');
                this.distanceCovered %= this.pathLength; // Обеспечиваем цикличность анимации
            }

            const point = this.path.pointAt(this.distanceCovered);
            const element = this.drawingCanvas.findOne('[data-tool="true"]');
            if (element) {
                element.center(point.x, point.y);
            }

            this.requestId = requestAnimationFrame(animate); // Запланировать следующий кадр
        };

        if (this.requestId) {
            cancelAnimationFrame(this.requestId); // Отменяем предыдущий запланированный кадр
        }

        this.requestId = requestAnimationFrame(animate); // Запускаем анимацию
        this.path.attr('visibility', this.isRunningThumb ? 'hidden' : 'visible');
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
    }

    /**
     * TODO
     * 1. Сделать key для элементов. У двух и более элементов должен быть одинаковый ключ, ключ положи class/data-attribute, чтобы можно было достать пары и отфильтровать траекториию
     * 2.
     */

    // saveAlongPath(){
    //     const listSvgConfigs = new Map();
    //     const documentHolst = document.getElementById('drawingCanvas');
    //     // TODO data-type нужно расширить значения допустимые. data-type должен описывать тип фигуры круг/квадрат
    //     // TODO Доставать нужно по ключу, ключ и тип являются разными значениями
    //     const getAllElementsOnAttribute = documentHolst.querySelectorAll('[fill]')
    //     // Родитель всех элементов на странице
    //     for(let i = 0; i < 2; i++) {
    //         const elements = [];
    //         // TODO for(let itemType of types) { }
    //         // Тут type
    //         for (let item of getAllElementsOnAttribute) {
    //             let config = {}
    //
    //             for (let attr of item.attributes) {
    //                 config[attr.name] = attr.value;
    //             }
    //
    //             elements.push(config);
    //         }
    //
    //         listSvgConfigs.set(i, elements);
    //     }
    //
    //     const convertToObject = Object.fromEntries(listSvgConfigs);
    //     // savedJson(convertToObject, this.currentName)
    // }

}
