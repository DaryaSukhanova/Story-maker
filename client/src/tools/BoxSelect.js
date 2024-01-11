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
            if(clickedElement.getAttribute('id') !== 'boundingBoxGroup'){
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
        const svgPoint = this.svgCanvas.createSVGPoint();
        svgPoint.x = 0;
        svgPoint.y = 0;

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("id", "boundingBoxGroup");

        // Создаем новый ограничивающий прямоугольник
        const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectElement.setAttribute("id", "boundingBox");
        rectElement.setAttribute("stroke", "#6189ef");
        rectElement.setAttribute("fill", "none");
        rectElement.setAttribute("stroke-width", "2");

        // Добавляем новый ограничивающий прямоугольник в группу
        group.appendChild(rectElement);

        // Добавляем группу с ограничивающим прямоугольником на холст
        this.svgCanvas.appendChild(group);
        this.boundingBoxRect = rectElement;

        const boundingBox = element.getBBox();
        svgPoint.x = boundingBox.x;
        svgPoint.y = boundingBox.y;
        const startPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());

        svgPoint.x = boundingBox.x + boundingBox.width;
        svgPoint.y = boundingBox.y + boundingBox.height;
        const endPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());

        let width = endPoint.x - startPoint.x;
        let height = endPoint.y - startPoint.y;

        this.boundingBoxRect.setAttribute("x", `${element.getBBox().x}`);
        this.boundingBoxRect.setAttribute("y", `${element.getBBox().y}`);
        this.boundingBoxRect.setAttribute("width", `${width}`);
        this.boundingBoxRect.setAttribute("height", `${height}`);

        // Добавляем ручки в группу
        this.addHandles(group);
    }

    resetBoundingBox() {
        const boundingBoxGroup = document.getElementById("boundingBoxGroup");
        if (boundingBoxGroup && boundingBoxGroup.parentNode) {
            boundingBoxGroup.parentNode.removeChild(boundingBoxGroup);
            this.boundingBoxRect = null;
        }
    }

    createHandle(x, y, cursor) {
        const handle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        handle.setAttribute("class", "resize-handle");
        handle.setAttribute("cx", x);
        handle.setAttribute("cy", y);
        handle.setAttribute("r", "4");
        handle.setAttribute("fill", "#ffffff");
        handle.setAttribute("stroke", "#6189ef");
        handle.setAttribute("stroke-width", "2");
        handle.style.cursor = cursor;
        return handle;
    }

    addHandles(currentGroup){
        const bbox = this.boundingBoxRect.getBBox()
        const handles = [
            { x: bbox.x, y: bbox.y, cursor: "nwse-resize" },
            { x: bbox.x + bbox.width, y: bbox.y, cursor: "nesw-resize" },
            { x: bbox.x, y: bbox.y + bbox.height, cursor: "nesw-resize" },
            { x: bbox.x + bbox.width, y: bbox.y + bbox.height, cursor: "nwse-resize" }
        ];
        handles.forEach(handleInfo => {
            const handle = this.createHandle(handleInfo.x, handleInfo.y, handleInfo.cursor);
            currentGroup.appendChild(handle);
            handle.addEventListener("mousedown", (event) => {
                this.handleResizeStart(event, handleInfo);
            });
        });
    }

    handleResizeStart(event, handleInfo) {
        event.preventDefault();
        event.stopPropagation();

        const initialX = event.clientX;
        const initialY = event.clientY;

        // Начальные размеры элемента
        const initialWidth = parseFloat(this.boundingBoxRect.getAttribute("width"));
        const initialHeight = parseFloat(this.boundingBoxRect.getAttribute("height"));


    }

}
