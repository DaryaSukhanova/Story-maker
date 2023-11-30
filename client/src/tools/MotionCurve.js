import AnimationTool from "./AnimationTool";

export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.pathData = "";
        this.motionPath = null;
        this.clickedElement = null
        this.listen();
        this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        if (this.motionPath) {
            const startDataPath = this.motionPath.getAttribute('d')
            // const match = startDataPath.match(/^M\s*([\d.]+)\s*([\d.]+)/);
            // const startXPath = parseFloat(match[1]);
            // const startYPath = parseFloat(match[2]);
            // console.log("start d ", startXPath +" "+ startYPath)
            this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
            if(this.clickedElement !== this.svgCanvas && this.clickedElement !== this.motionPath){
                // clickedElement.setAttribute("x", `${startXPath}`)
                // clickedElement.setAttribute("y", `${startYPath}`)
                // console.log('Clicked element:', clickedElement);
                // console.log("start d ", startXPath +" "+ startYPath)
                // this.animate(clickedElement)
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

    animate(element){
        this.animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        this.animateMotion.setAttribute("dur", "2s");
        this.animateMotion.setAttribute("repeatCount", "indefinite"); // Бесконечное повторение

        const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
        mpath.setAttribute("href", "#motionPath");
        this.animateMotion.appendChild(mpath);

        element.appendChild(this.animateMotion);
    }


    toggleAnimationPause = () => {
        if (this.animateMotion) {
            if (this.animateMotion.getAttribute('repeatCount') === 'indefinite') {
                this.animateMotion.setAttribute('repeatCount', '0');
            } else {
                this.animateMotion.setAttribute('repeatCount', 'indefinite');
            }
        }
    }
}
