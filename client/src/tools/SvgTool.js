export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = '#000000';
        this.currentLineWidth = '2';
        this.boundingBoxRect = null
        this.destroyEvents();

    }

    set svgFillStroke(color) {
        this.currentStroke = color;
    }
    set svgLineWidth(width) {
        this.currentLineWidth = width;
    }

    destroyEvents() {
        console.log("this.boundingBoxRect", document.getElementById("boundingBox"))
        const boundingBoxElement = document.getElementById("boundingBox");

        if (boundingBoxElement && boundingBoxElement.parentNode) {
            boundingBoxElement.parentNode.removeChild(boundingBoxElement);
        }
        
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

        let width = endPoint.x - startPoint.x;
        let height = endPoint.y - startPoint.y;

        // Если есть предыдущий ограничивающий прямоугольник, удаляем его
        if (this.boundingBoxRect) {
            this.svgCanvas.removeChild(this.boundingBoxRect);
        }

        // Создаем новый ограничивающий прямоугольник
        const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectElement.setAttribute("id", "boundingBox")
        rectElement.setAttribute("x", `${element.getBBox().x}`);
        rectElement.setAttribute("y", `${element.getBBox().y}`);
        rectElement.setAttribute("width", `${width}`);
        rectElement.setAttribute("height", `${height}`);
        rectElement.setAttribute("stroke", "#003ace");
        rectElement.setAttribute("fill", "none");
        rectElement.setAttribute("stroke-width", "0.5");

        // Добавляем новый ограничивающий прямоугольник на холст
        this.svgCanvas.appendChild(rectElement);

        // Сохраняем ссылку на новый ограничивающий прямоугольник
        this.boundingBoxRect = rectElement;
    }
}
