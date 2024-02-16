import AnimationTool from "./AnimationTool";
import axios from "axios";
import animationToolState from "../store/animationToolState";

let distanceCovered = null
let isAnimationSaved = animationToolState.isAnimationSaved;
let isUpdateTime = true

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
        this.play = false;
        this.listen();
        this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.playButton.addEventListener('click', this.toggleAnimationPause.bind(this));
        this.leftStopButton.addEventListener('click', this.toggleAnimationLeftStop.bind(this));
        this.groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.removeMotionPath()
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    removeMotionPath (){
        let elementToRemove = document.getElementById('motionPath');
        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);}
    }
    mouseUpHandler(e) {
        if (this.motionPath) {
            this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
            this.saveSvg = this.clickedElement.cloneNode(true);
            this.saveMotionPath = this.motionPath.cloneNode(true);
            this.saveSvg.removeAttribute("id");

            if (this.clickedElement.getAttribute('data-tool') === 'true') {
                animationToolState.setPlay();
                this.play = animationToolState.currentPlay;
                console.log(this.clickedElement);
                // this.playButton.className = "btn pause-button ";
                this.animate(this.clickedElement);
            }

            const motionPathClone = this.saveMotionPath.cloneNode(true);
            this.motionPath.setAttribute("id", "motionPath");

            // this.groupElement.setAttribute("id", "animationGroup");
            // this.groupElement.appendChild(this.clickedElement);
            // this.groupElement.appendChild(this.motionPath);
            //
            // // Добавить группу в SVG-холст
            // this.svgCanvas.appendChild(this.groupElement);

            this.motionPath = null;
        }
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;

        if (!this.motionPath ) {
            this.motionPath = this.currentPath
            this.motionPath.setAttribute("stroke", "#8DADFF");
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

        if(element.hasAttribute("r")){
            element.setAttribute("cx", 0)
            element.setAttribute("cy", 0)
        }

        const moveAlongPath = () => {
            if (this.play) {
                const point = motionPath.getPointAtLength(distanceCovered);
                if (element.hasAttribute("d") || element.hasAttribute("points")){
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
                    distanceCovered = 0
                    const newStartTime = Date.now();
                    if (isUpdateTime){
                        animationToolState.setStartTime(newStartTime);
                    }

                    requestAnimationFrame(moveAlongPath);
                    if (animationToolState.isAnimationSaved) {
                        console.log("isSave")
                        this.saveAnimatedSvg()
                        animationToolState.isAnimationSaved = false;
                    }
                }
                motionPath.style.display = "none"
            } else {
                requestAnimationFrame(moveAlongPath);
                motionPath.style.display = "block"
            }
        };
        moveAlongPath();
    }

    toggleAnimationPause = () => {
        if (this.clickedElement.getAttribute('data-tool') === 'true') {
            console.log("click play")
            this.play = !this.play;
            // this.playButton.className = this.play ? "btn pause-button " : "btn play-button"
        }
    }
    toggleAnimationLeftStop = () => {
        if (this.clickedElement.getAttribute('data-tool') === 'true') {
            // Возвращение элемента к изначальной точке пути
            if (this.currentPath) {
                // Остановка движения элемента
                this.play = false
                if(animationToolState.currentPlay){
                    animationToolState.setPlay();
                }

                // this.play = false;
                // this.playButton.className = "btn play-button";
                if (this.clickedElement.hasAttribute("d") || this.clickedElement.hasAttribute("points")){
                    const motionPath = document.getElementById('motionPath');
                    const point = motionPath.getPointAtLength(0);
                    const initialX = this.clickedElement.getPointAtLength(0).x;
                    const initialY = this.clickedElement.getPointAtLength(0).y;
                    console.log(initialX, initialY)
                    console.log(point.x, point.y)
                    this.clickedElement.setAttribute("transform", `translate(${point.x-initialX} ${point.y-initialY})`);
                } else {
                    const initialX = this.currentPath.getPointAtLength(0).x;
                    const initialY = this.currentPath.getPointAtLength(0).y;
                    const initialTransform = `translate(${initialX} ${initialY})`;
                    this.clickedElement.setAttribute("transform", initialTransform);
                }

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
                this.currentSpeed = ${this.currentSpeed}
                let distanceCovered = 0;
                let isAnimationSaved = false;
                let isUpdateTime = false
                function ${this.animate.toString()}
                const animatedElement = document.getElementById('animatedElementId');
                animate(animatedElement);
            ]]>
        `;
        svgContainer.appendChild(scriptElement);


        const jsonData = {
            svg: svgContainer.outerHTML, // включаем SVG непосредственно в объект JSON
            name: `${this.currentName}`
        };

        // Отправка на сервер с использованием Axios
        axios.post(`http://localhost:5000/api/v1/animations`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            alert("successfully uploaded to the server")
            console.log("successfully uploaded to the server")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
