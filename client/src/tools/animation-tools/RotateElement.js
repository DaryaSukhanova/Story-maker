import AnimationTool from "./AnimationTool";
import animationToolState from "../../store/animationToolState";


export default class RotateElement extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen();
    }

    listen() {
        console.log("listen")
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

        console.log("down")
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const svgNS = this.svgCanvas.namespaceURI;
        const mouseX = e.clientX - this.svgCanvas.getBoundingClientRect().left;
        const mouseY = e.clientY - this.svgCanvas.getBoundingClientRect().top;

        circle.setAttributeNS(null, "cx", "500");
        circle.setAttributeNS(null, "cy", "300");
        circle.setAttributeNS(null, "r", "200");
        circle.setAttributeNS(null, "stroke", "blue");
        circle.setAttributeNS(null, "fill", "none");
        circle.setAttributeNS(null, "stroke-width", "10");
        // this.svgCanvas.appendChild(circle);
    }

    mouseMoveHandler(e) {

    }

    runAnimation(element) {
        const pathData = element.getAttribute('d');
        const pathCoordinates = pathData.match(/(\d+)/g);
        const startX = pathCoordinates[0];
        const startY = pathCoordinates[1];
        const endX = pathCoordinates[2];
        const endY = pathCoordinates[3];

        const centerX = (parseInt(startX) + parseInt(endX)) / 2;
        const centerY = (parseInt(startY) + parseInt(endY)) / 2;

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

