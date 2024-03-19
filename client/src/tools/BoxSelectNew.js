import SvgTool from "./SvgTool";
import svgCanvas from "../components/SvgCanvas";

export default class BoxSelectNew extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // this.resetBoundingBox();
        this.listen();
        this.svgElement = null
        this.startBBox = null
        this.handles = [];
        this.isScale = false;
        this.selectedHandle = null
        this.bBoxGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.bBoxGroup.setAttribute("id", "bBoxGroup");
        this.svgCanvas.appendChild(this.bBoxGroup)
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }
    mouseMoveHandler(event) {
        if(this.isScale){
            if (this.selectedHandle) {
                this.resizeElement(this.svgElement.getBBox(), event);
            }
        }

    }

    mouseUpHandler(event) {
        this.isScale = false
    }

    mouseDownHandler(event) {
        this.isScale = true
        const clickedElement = event.target;

        // Проверяем, имеет ли элемент атрибут data-tool="true"
        if (clickedElement.getAttribute('data-tool') === 'true') {
            // Если да, то элемент удовлетворяет условию
            this.svgElement = clickedElement
            this.startBBox = clickedElement.getBBox()
            console.log(clickedElement); // Выводим информацию о кликнутом элементе
            console.log(clickedElement.getBBox())

            // this.createBoundingBox(this.startBBox)
            this.createHandles(this.startBBox);
        }

        if (clickedElement.classList.contains('resize-handle')) {
            this.selectedHandle = clickedElement;
            console.log(clickedElement)
        }
    }

    createHandles(bbox){
        const x = bbox.x;
        const y = bbox.y;
        const width = bbox.width;
        const height = bbox.height;

        const handlesData = [
            { x: x, y: y, id: "top-left" },
            { x: x + width, y: y, id: "top-right" },
            { x: x, y: y + height, id:"bottom-left" },
            { x: x + width, y: y + height, id: "bottom-right" }
        ];
        handlesData.forEach((data) => {
            const handle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            handle.setAttribute("class", "resize-handle");
            handle.setAttribute("id", `${data.id}`);
            handle.setAttribute("cx", data.x);
            handle.setAttribute("cy", data.y);
            handle.setAttribute("r", "5");
            handle.setAttribute("fill", "#ffffff");
            handle.setAttribute("stroke", "#6189ef");
            this.bBoxGroup.appendChild(handle);
            this.handles.push(handle);
        });
    }

    resizeElement(bbox, event){
        const x = event.clientX;
        const y = event.clientY;

        let scalePointX = null
        let scalePointY = null
        const svgPoint = this.svgCanvas.createSVGPoint();

        svgPoint.x = x;
        svgPoint.y = y;
        const transformedPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());


        switch (this.selectedHandle.id) {
            case 'top-left':
                scalePointX = bbox.x + bbox.width;
                scalePointY = bbox.y + bbox.height;
                bbox.width = bbox.width - (transformedPoint.x - bbox.x)
                bbox.height = bbox.height - (transformedPoint.y - bbox.y);
                bbox.x = transformedPoint.x;
                bbox.y = transformedPoint.y;
                break;
            case 'top-right':
                scalePointX = bbox.x;
                scalePointY = bbox.y + bbox.height;
                bbox.width = transformedPoint.x - bbox.x
                bbox.height = bbox.height - (transformedPoint.y - bbox.y)
                bbox.y = transformedPoint.y;
                break;
            case 'bottom-left':
                scalePointX = bbox.x + bbox.width;
                scalePointY = bbox.y;
                bbox.width = bbox.width - (transformedPoint.x - bbox.x)
                bbox.height = transformedPoint.y - bbox.y
                bbox.x = transformedPoint.x;
                break;
            case 'bottom-right':
                scalePointX = bbox.x
                scalePointY = bbox.y;
                bbox.width = transformedPoint.x - bbox.x;
                bbox.height = transformedPoint.y - bbox.y
                break;
        }

        this.updateHandlesCoordinates(bbox);
        const scaleX = bbox.width / this.startBBox.width;
        const scaleY = bbox.height / this.startBBox.height;
        console.log(scaleX, scaleY)
        this.svgElement.setAttribute('transform',
            `translate(${scalePointX}, ${scalePointY}) scale(${scaleX}, ${scaleY}) translate(${-scalePointX}, ${-scalePointY})`);

    }
    updateHandlesCoordinates(bbox) {
        console.log("bbox", bbox)
        // Обновляем координаты ручек в соответствии с новым bbox
        this.handles.forEach(handle => {
            switch (handle.id) {
                case 'top-left':
                    handle.setAttribute('cx', bbox.x);
                    handle.setAttribute('cy', bbox.y);
                    break;
                case 'top-right':
                    handle.setAttribute('cx', bbox.x + bbox.width);
                    handle.setAttribute('cy', bbox.y);
                    break;
                case 'bottom-left':
                    handle.setAttribute('cx', bbox.x);
                    handle.setAttribute('cy', bbox.y + bbox.height);
                    break;
                case 'bottom-right':
                    handle.setAttribute('cx', bbox.x + bbox.width);
                    handle.setAttribute('cy', bbox.y + bbox.height);
                    break;
            }
        });
    }

    createBoundingBox(bbox) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", bbox.x);
        rect.setAttribute("y", bbox.y);
        rect.setAttribute("width", bbox.width);
        rect.setAttribute("height", bbox.height);
        rect.setAttribute("stroke", "#6189ef");
        rect.setAttribute("stroke-width", "2");
        rect.setAttribute("fill", "none");
        this.bBoxGroup.appendChild(rect);
    }

}
