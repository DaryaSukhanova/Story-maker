import AnimationTool from "./AnimationTool";
import axios from "axios";
import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";
import svgCanvas from "../../components/animation-components/SvgCanvas";
import canvasState from "../../store/canvasState";
import svgCanvasState from "../../store/svgCanvasState";

import {SVG} from "@svgdotjs/svg.js";


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
        // this.motionPath = null;
        // this.clickedElement = null
        // this.saveSvg = null
        // this.saveMotionPath = null
        // this.playButton = document.getElementById('playBtn');
        // this.leftStopButton = document.getElementById('leftStopBtn')

        // this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // this.playButton.addEventListener('click', this.toggleAnimationPause.bind(this));
        // this.leftStopButton.addEventListener('click', this.toggleAnimationLeftStop.bind(this));
        // this.groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        // this.removeMotionPath()
        this.arrPath = []
        svgToolState.clearBoundingBox()

    }

    startAnimations(isRunningThumb) {
        this.isRunningThumb = isRunningThumb; // Сохраняем текущее состояние флага

        if (!this.path) return; // Если путь не определен, выходим из функции

        if (!this.pathLength) {
            this.pathLength = this.path.length(); // Получаем длину пути, если она ещё не была получена
        }

        const animate = () => {
            if (!this.isRunningThumb) {
                console.log('Animation paused at distance:', this.distanceCovered);
                return; // Прекращаем анимацию, если флаг опущен
            }

            this.distanceCovered += 2; // Увеличиваем пройденное расстояние
            if (this.distanceCovered >= this.pathLength) {
                console.log('Animation completed, restarting...');
                this.distanceCovered = 0; // Сбросить анимацию для начала с начальной точки
            }

            const point = this.path.pointAt(this.distanceCovered); // Получаем точку на кривой
            const element = this.drawingCanvas.findOne('[data-tool="true"]');
            if (element) {
                element.center(point.x, point.y);
            }

            this.requestId = requestAnimationFrame(animate); // Запланировать следующий кадр
        };

        if (this.requestId) {
            cancelAnimationFrame(this.requestId); // Отменяем предыдущий запланированный кадр
        }

        if (this.isRunningThumb) {
            this.requestId = requestAnimationFrame(animate); // Запускаем анимацию
            this.path.attr('visibility', 'hidden');
        } else{
            this.path.attr('visibility', 'visible');
        }
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

    // removeMotionPath (){
    //     let elementToRemove = document.getElementById('motionPath');
    //     if (elementToRemove) {
    //         elementToRemove.parentNode.removeChild(elementToRemove);}
    // }
    // mouseUpHandler(e) {
    //     console.log(svgCanvasState.svgElements)
    //     if (this.motionPath) {
    //         this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
    //         this.saveSvg = this.clickedElement.cloneNode(true);
    //         this.saveMotionPath = this.motionPath.cloneNode(true);
    //         this.saveSvg.removeAttribute("id");
    //
    //         if (this.clickedElement.getAttribute('data-tool') === 'true') {
    //             animationToolState.setPlay();
    //             this.play = animationToolState.currentPlay;
    //             console.log(this.clickedElement);
    //             // this.playButton.className = "btn pause-button ";
    //             this.animate(this.clickedElement);
    //         }
    //
    //         const motionPathClone = this.saveMotionPath.cloneNode(true);
    //         this.motionPath.setAttribute("id", "motionPath");
    //
    //         // this.groupElement.setAttribute("id", "animationGroup");
    //         // this.groupElement.appendChild(this.clickedElement);
    //         // this.groupElement.appendChild(this.motionPath);
    //         //
    //         // // Добавить группу в SVG-холст
    //         // this.svgCanvas.appendChild(this.groupElement);
    //
    //         this.motionPath = null;
    //     }
    //
    // }
    //
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

    // animate(element) {
    //     const motionPath = document.getElementById('motionPath');
    //     const totalLength = motionPath.getTotalLength();
    //     distanceCovered = 0;
    //     let speed = this.currentSpeed;
    //     element.setAttribute("x", 0)
    //     element.setAttribute("y", 0)
    //
    //     if(element.hasAttribute("r")){
    //         element.setAttribute("cx", 0)
    //         element.setAttribute("cy", 0)
    //     }
    //
    //     const moveAlongPath = () => {
    //         if (this.play) {
    //             const point = motionPath.getPointAtLength(distanceCovered);
    //             if (element.hasAttribute("d") || element.hasAttribute("points")){
    //                 const initialX = element.getPointAtLength(0).x;
    //                 const initialY = element.getPointAtLength(0).y;
    //                 element.setAttribute("transform", `translate(${point.x-initialX} ${point.y-initialY})`);
    //             } else {
    //                 element.setAttribute("transform", `translate(${point.x} ${point.y})`);
    //             }
    //             speed = this.currentSpeed;
    //             distanceCovered += speed;
    //             if (distanceCovered <= totalLength) {
    //                 requestAnimationFrame(moveAlongPath);
    //
    //             } else {
    //                 distanceCovered = 0
    //                 const newStartTime = Date.now();
    //                 if (isUpdateTime){
    //                     animationToolState.setStartTime(newStartTime);
    //                 }
    //
    //                 requestAnimationFrame(moveAlongPath);
    //                 if (animationToolState.isAnimationSaved) {
    //                     console.log("isSave")
    //                     // this.saveAnimatedSvg()
    //                     // this.save()
    //                     this.saveAlongPath()
    //                     animationToolState.isAnimationSaved = false;
    //                 }
    //             }
    //             motionPath.style.display = "none"
    //         } else {
    //             requestAnimationFrame(moveAlongPath);
    //             motionPath.style.display = "block"
    //         }
    //     };
    //     moveAlongPath();
    // }


    // toggleAnimationPause = () => {
    //     if (this.clickedElement.getAttribute('data-tool') === 'true') {
    //         console.log("click play")
    //         this.play = !this.play;
    //         // this.playButton.className = this.play ? "btn pause-button " : "btn play-button"
    //     }
    // }
    // toggleAnimationLeftStop = () => {
    //     if (this.clickedElement.getAttribute('data-tool') === 'true') {
    //         // Возвращение элемента к изначальной точке пути
    //         if (this.currentPath) {
    //             // Остановка движения элемента
    //             this.play = false
    //             if(animationToolState.currentPlay){
    //                 animationToolState.setPlay();
    //             }
    //
    //             if (this.clickedElement.hasAttribute("d") || this.clickedElement.hasAttribute("points")){
    //                 const motionPath = document.getElementById('motionPath');
    //                 const point = motionPath.getPointAtLength(0);
    //                 const initialX = this.clickedElement.getPointAtLength(0).x;
    //                 const initialY = this.clickedElement.getPointAtLength(0).y;
    //                 console.log(initialX, initialY)
    //                 console.log(point.x, point.y)
    //                 this.clickedElement.setAttribute("transform", `translate(${point.x-initialX} ${point.y-initialY})`);
    //             } else {
    //                 const initialX = this.currentPath.getPointAtLength(0).x;
    //                 const initialY = this.currentPath.getPointAtLength(0).y;
    //                 const initialTransform = `translate(${initialX} ${initialY})`;
    //                 this.clickedElement.setAttribute("transform", initialTransform);
    //             }
    //
    //             distanceCovered = 0
    //         }
    //     }
    // }
    // save() {
    //     this.saveAlongPath()
    // }

}
