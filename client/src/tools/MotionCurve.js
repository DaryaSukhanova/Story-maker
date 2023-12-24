import AnimationTool from "./AnimationTool";
import axios from "axios";
// import {parseString} from "xml2js/lib/parser";
// import xml2js from "xml2js";

let distanceCovered = null
let isAnimationSaved = false;
export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.pathData = "";
        this.motionPath = null;
        this.clickedElement = null
        this.saveSvg = null
        this.saveMotionPath = null
        this.playButton = document.getElementById('playBtn');
        this.leftStopButton = document.getElementById('leftStopBtn')
        this.play = this.statePlay;
        this.listen();
        this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.playButton.addEventListener('click', this.toggleAnimationPause.bind(this));
        this.leftStopButton.addEventListener('click', this.toggleAnimationLeftStop.bind(this));

    }
    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        console.log(this.play)
        if (this.motionPath) {
            this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
            this.saveSvg = this.clickedElement.cloneNode(true)
            this.saveMotionPath = this.motionPath.cloneNode(true)
            this.saveSvg.removeAttribute("id");

            if(this.play && this.clickedElement !== this.svgCanvas && this.clickedElement !== this.motionPath){
                this.animate(this.clickedElement)
            }
            this.motionPath = null;
        }
    }

    mouseDownHandler(e) {

        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;


        if (!this.motionPath) {
            this.motionPath = this.currentPath
            this.motionPath.setAttribute("stroke", "red");
            this.motionPath.setAttribute("stroke-width", "2");
            this.motionPath.setAttribute("fill", "none");
            this.motionPath.setAttribute("id", "motionPath");
            this.svgCanvas.appendChild(this.motionPath);
        }
        this.pathData = `M ${startX} ${startY}`;

    }

    mouseMoveHandler(e) {
        if (this.motionPath) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;
            this.pathData += ` L ${currentX} ${currentY}`;
            this.updatePath();
            // console.log(this.motionPath)
        }

    }

    updatePath() {
        if (this.motionPath) {
            this.motionPath.setAttribute("d", this.pathData);
        }
    }

    animate(element) {
        const motionPath = document.getElementById('motionPath');
        const totalLength = motionPath.getTotalLength();
        distanceCovered = 0;
        let speed = this.currentSpeed;
        element.setAttribute("x", 0)
        element.setAttribute("y", 0)

        const moveAlongPath = () => {
            if (this.play) {
                const point = motionPath.getPointAtLength(distanceCovered);
                if (element.hasAttribute("d")){
                    const initialX = element.getPointAtLength(0).x;
                    const initialY = element.getPointAtLength(0).y;
                    element.setAttribute("transform", `translate(${point.x-initialX} ${point.y-initialY})`);
                } else {
                    element.setAttribute("transform", `translate(${point.x} ${point.y})`);
                }

                speed = this.currentSpeed;
                distanceCovered += speed;
                if (distanceCovered <= totalLength) {
                    requestAnimationFrame(moveAlongPath);
                } else {
                    // console.log(this.animations)
                    distanceCovered = 0
                    requestAnimationFrame(moveAlongPath);
                    if (!isAnimationSaved) {
                        isAnimationSaved = true;
                        this.saveAnimatedSvg()
                    }
                }
            } else {
                requestAnimationFrame(moveAlongPath);
            }
        };
        moveAlongPath();
    }

    toggleAnimationPause = () => {
        if (this.clickedElement !== this.svgCanvas && this.clickedElement !== this.currentPath) {
            this.play = !this.play;
            this.playButton.className = this.play ? "btn pause-button " : "btn play-button"
            console.log(this.play);
        }
    }
    toggleAnimationLeftStop = () => {
        if (this.clickedElement !== this.svgCanvas && this.clickedElement !== this.currentPath) {

            // Возвращение элемента к изначальной точке пути
            if (this.currentPath) {
                // Остановка движения элемента
                this.play = false;
                this.playButton.className = "btn play-button";
                const initialX = this.currentPath.getPointAtLength(0).x;
                const initialY = this.currentPath.getPointAtLength(0).y;
                const initialTransform = `translate(${initialX} ${initialY})`;
                this.clickedElement.setAttribute("transform", initialTransform);
                distanceCovered = 0
            }
        }
    }

    saveAnimatedSvg() {
        const svgContainer = document.createElement('svg');
        svgContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgContainer.setAttribute("width", "1000");
        svgContainer.setAttribute("height", "1000");
        svgContainer.setAttribute("viewBox", "0 0 1000 1000");
        this.saveSvg.setAttribute("id", "animatedElementId");

        const motionPathClone = this.saveMotionPath.cloneNode(true);
        motionPathClone.setAttribute("id", "motionPath");

        svgContainer.appendChild(this.saveSvg);
        svgContainer.appendChild(motionPathClone);

        const scriptElement = document.createElement('script');

        scriptElement.textContent = `
            <![CDATA[
                this.play = true
                function ${this.animate.toString()}
                const animatedElement = document.getElementById('animatedElementId');
                animate(animatedElement);
            ]]>
        `;
        svgContainer.appendChild(scriptElement);
        const jsonData = {
            svg: svgContainer.outerHTML // включаем SVG непосредственно в объект JSON

        };

        // Отправка на сервер с использованием Axios
        axios.post(`http://localhost:5000/api/v1/animations`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('Server response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
