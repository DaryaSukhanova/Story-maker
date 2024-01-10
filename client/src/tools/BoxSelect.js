import SvgTool from "./SvgTool";

export default class BoxSelect extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // this.resetBoundingBox();
        this.listen();
        this.boundingBoxRect = null;
        this.isDragging = false;
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseMoveHandler(event) {
        if (this.isDragging) {
            const x = event.clientX;
            const y = event.clientY;
        }
    }

    mouseUpHandler() {
        this.isDragging = false;
    }
    mouseDownHandler(event) {
        const x = event.clientX;
        const y = event.clientY;

        // Находим элемент под указанными координатами
        const clickedElement = document.elementFromPoint(x, y);
        console.log(clickedElement)
        if (!(clickedElement.getAttribute('data-tool') === 'true')) {
            if(clickedElement.getAttribute('id') !== 'boundingBox'){
                this.resetBoundingBox()
                console.log("click box")
            }
            // Элемент не является экземпляром SvgTool, прекращаем выполнение
            return;
        }
        if(!this.boundingBoxRect){
            this.getBoundingBox(clickedElement);
        }

        this.isDragging = true;
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

        // Создаем новый ограничивающий прямоугольник
        if(!this.boundingBoxRect){
            const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectElement.setAttribute("id", "boundingBox");
            rectElement.setAttribute("x", `${element.getBBox().x}`);
            rectElement.setAttribute("y", `${element.getBBox().y}`);
            rectElement.setAttribute("width", `${width}`);
            rectElement.setAttribute("height", `${height}`);
            rectElement.setAttribute("stroke", "#003ace");
            rectElement.setAttribute("fill", "none");
            rectElement.setAttribute("stroke-width", "4");

            // Добавляем новый ограничивающий прямоугольник на холст
            this.svgCanvas.appendChild(rectElement);
            this.boundingBoxRect = rectElement;
        }

        this.boundingBoxRect.setAttribute("x", `${element.getBBox().x}`);
        this.boundingBoxRect.setAttribute("y", `${element.getBBox().y}`);
        this.boundingBoxRect.setAttribute("width", `${width}`);
        this.boundingBoxRect.setAttribute("height", `${height}`);

    }

    resetBoundingBox() {
        // Если есть предыдущий ограничивающий прямоугольник, удаляем его
        if (this.boundingBoxRect && this.boundingBoxRect.parentNode) {
            this.boundingBoxRect.parentNode.removeChild(this.boundingBoxRect);
            this.boundingBoxRect = null;
        }
    }


}
