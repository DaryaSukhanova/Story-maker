export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = '#8DADFF';
        this.currentLineWidth = '2';
        this.destroyEvents();
    }

    set svgFillStroke(color) {
        this.currentStroke = color;
    }
    set svgLineWidth(width) {
        this.currentLineWidth = width;
    }

    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;
    }

    getBoundingBox(element) {
        const boundingBox = element.getBBox();
        const svgPoint = this.svgCanvas.createSVGPoint();

        svgPoint.x = boundingBox.x;
        svgPoint.y = boundingBox.y;
        const startPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());

        svgPoint.x = boundingBox.x + boundingBox.width;
        svgPoint.y = boundingBox.y + boundingBox.height;
        const endPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());
        console.log("startPoint.x", startPoint.x, "startPoint.y", startPoint.y)

        let width = endPoint.x - startPoint.x
        let height = endPoint.y - startPoint.y
        const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectElement.setAttribute("x", `${element.getBBox().x}`);
        rectElement.setAttribute("y", `${element.getBBox().y}`);
        rectElement.setAttribute("width", `${width}`);
        rectElement.setAttribute("height", `${height}`);
        rectElement.setAttribute("stroke", "#003ace");
        rectElement.setAttribute("fill", "none");
        rectElement.setAttribute("stroke-width", "0.5");

        this.svgCanvas.appendChild(rectElement);
        // return {
        //     width: endPoint.x - startPoint.x,
        //     height: endPoint.y - startPoint.y,
        // };
    }
}
