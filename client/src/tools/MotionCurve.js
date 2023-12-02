import AnimationTool from "./AnimationTool";
import axios from "axios";


export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.pathData = "";
        this.motionPath = null;
        this.clickedElement = null
        this.saveSvg = null
        this.saveMotionPath = null
        this.paused = false;
        this.listen();
        this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.frames = null
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        if (this.motionPath) {
            const startDataPath = this.motionPath.getAttribute('d')
            this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
            this.saveSvg = this.clickedElement.cloneNode(true)
            this.saveMotionPath = this.motionPath.cloneNode(true)
            this.saveSvg.removeAttribute("id");

            if(this.clickedElement !== this.svgCanvas && this.clickedElement !== this.motionPath){
                this.animate(this.clickedElement)

            }

            this.motionPath = null;
        }
        const pauseButton = document.getElementById('pauseButton')
        pauseButton.addEventListener('click', this.toggleAnimationPause);

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
            console.log(this.motionPath)
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
        let distanceCovered = 0;
        const speed = 5;

        const moveAlongPath = () => {
            // if (!this.paused) {
                const point = motionPath.getPointAtLength(distanceCovered);
                element.setAttribute("transform", `translate(${point.x} ${point.y})`);

                distanceCovered += speed;

                if (distanceCovered <= totalLength) {
                    requestAnimationFrame(moveAlongPath);
                } else {
                    // console.log(this.frames)
                    this.saveAnimatedSvg()
                }
            // } else {
            //     requestAnimationFrame(moveAlongPath);
            // }
        };

        moveAlongPath();
    }


    toggleAnimationPause = () => {
        this.paused = !this.paused;
        console.log(this.paused)
    }

    saveAnimatedSvg() {
        const svgContainer = document.createElement('svg');

        this.saveSvg.setAttribute("id", "animatedElementId");

        const motionPathClone = this.saveMotionPath.cloneNode(true);
        motionPathClone.setAttribute("id", "motionPath");

        svgContainer.appendChild(this.saveSvg);
        svgContainer.appendChild(motionPathClone);

        const scriptElement = document.createElement('script');

        scriptElement.textContent = `
        <![CDATA[
            function animate(element) {
                const motionPath = document.getElementById('motionPath');
                const totalLength = motionPath.getTotalLength();
                let distanceCovered = 0;
                const speed = 5;

                const moveAlongPath = () => {
                    const point = motionPath.getPointAtLength(distanceCovered);
                    element.setAttribute("transform", \`translate(\${point.x} \${point.y})\`);

                    distanceCovered += speed;

                    if (distanceCovered <= totalLength) {
                        requestAnimationFrame(moveAlongPath);
                    } else {
                        // Анимация завершена
                    }
                };

                moveAlongPath();
            }

            const animatedElement = document.getElementById('animatedElementId');
            animate(animatedElement);
        ]]>
    `;

        svgContainer.appendChild(scriptElement);
        console.log(svgContainer);
    }

}
