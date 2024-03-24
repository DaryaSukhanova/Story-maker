import AnimationTool from "./AnimationTool";
import animationToolState from "../../store/animationToolState";


export default class RotateElement extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen();
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {

    }

    mouseDownHandler(e) {
        this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
        if(this.clickedElement.getAttribute('data-tool') === 'true'){
            console.log(this.clickedElement);
            this.runAnimation(this.clickedElement);
        }

    }

    mouseMoveHandler(e) {
    }

    runAnimation(element) {
        const x1 = parseFloat(element.getAttribute('x1'));
        const y1 = parseFloat(element.getAttribute('y1'));
        const x2 = parseFloat(element.getAttribute('x2'));
        const y2 = parseFloat(element.getAttribute('y2'));

        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;

        const style = document.createElement('style');
        style.textContent = `
        @keyframes rotatePath {
            0% {
                transform-origin: ${centerX}px ${centerY}px; 
                transform: rotate(0deg);
            }
            100% {
                transform-origin: ${centerX}px ${centerY}px; 
                transform: rotate(180deg);
            }
        }
    `;
        document.head.appendChild(style);
        element.style.animation = "rotatePath 2s forwards";
    }

}

