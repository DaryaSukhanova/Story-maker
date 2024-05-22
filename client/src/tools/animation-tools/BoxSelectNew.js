import SvgTool from "./SvgTool";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class BoxSelectNew extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen();
        this.svgElement = null;
        this.startBBox = null;
        this.newStartBBox = null;
        this.handles = [];
        this.isScale = false;
        this.selectedHandle = null;
        this.bBoxGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.bBoxGroup.setAttribute("id", "bBoxGroup");
        this.bBoxGroup.setAttribute("data-bBoxGroup", "true");

        this.svgCanvas.appendChild(this.bBoxGroup);
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
    }

    destroyEvents() {
        super.destroyEvents();
        document.removeEventListener('keydown', this.keyDownHandler);
        this.svgElement = null; // Сброс выбранного элемента при уничтожении событий
    }

    keyDownHandler(event) {
        if (event.key === 'Delete' || event.key === 'Del') {
            console.log("Delete key pressed");
            if (this.svgElement && this.svgCanvas.contains(this.svgElement)) {
                const elementId = this.svgElement.getAttribute('id');
                svgCanvasState.removeSvgElement(elementId);
                this.svgElement.remove();
                svgToolState.clearBoundingBox();
                this.svgElement = null;
                console.log(`Element with ID ${elementId} removed from both DOM and state array.`);
            }
        }
    }

    mouseMoveHandler(event) {
        if (this.isScale && this.selectedHandle && this.svgElement) {
            this.resizeElement(this.svgElement.getBBox(), event);
        }
    }

    mouseUpHandler() {
        this.isScale = false;
        this.selectedHandle = null; // сбрасываем выбранную ручку
    }

    mouseDownHandler(event) {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('resize-handle')) {
            this.isScale = true;
            this.selectedHandle = clickedElement;
            return; // выходим из функции, чтобы не сбрасывать svgElement
        }

        if (clickedElement.getAttribute('data-tool') === 'true') {
            console.log(clickedElement);
            this.svgElement = clickedElement;
            this.startBBox = clickedElement.getBBox();
            this.createHandles(this.getBoundingBox(this.svgElement));
            this.createBoundingBoxBorder();
        } else {
            this.svgElement = null;
        }

        if (clickedElement === this.svgCanvas && !clickedElement.classList.contains('resize-handle')) {
            svgToolState.clearBoundingBox();
            this.isScale = false;
        }
    }

    getBoundingBox(element) {
        const canvasRect = this.svgCanvas.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        return {
            x: elementRect.left - canvasRect.left,
            y: elementRect.top - canvasRect.top,
            width: elementRect.width,
            height: elementRect.height
        };
    }

    createHandles(bbox) {
        const existingHandles = this.bBoxGroup.querySelectorAll('circle');
        existingHandles.forEach(handle => this.bBoxGroup.removeChild(handle));
        const x = bbox.x;
        const y = bbox.y;
        const width = bbox.width;
        const height = bbox.height;

        const handlesData = [
            { x: x, y: y, id: "top-left" },
            { x: x + width, y: y, id: "top-right" },
            { x: x, y: y + height, id: "bottom-left" },
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

    resizeElement(bbox, event) {
        const x = event.clientX;
        const y = event.clientY;

        let scalePointX = null;
        let scalePointY = null;
        const svgPoint = this.svgCanvas.createSVGPoint();

        svgPoint.x = x;
        svgPoint.y = y;
        const transformedPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());

        switch (this.selectedHandle.id) {
            case 'top-left':
                scalePointX = bbox.x + bbox.width;
                scalePointY = bbox.y + bbox.height;
                bbox.width = bbox.width - (transformedPoint.x - bbox.x);
                bbox.height = bbox.height - (transformedPoint.y - bbox.y);
                bbox.x = transformedPoint.x;
                bbox.y = transformedPoint.y;
                break;
            case 'top-right':
                scalePointX = bbox.x;
                scalePointY = bbox.y + bbox.height;
                bbox.width = transformedPoint.x - bbox.x;
                bbox.height = bbox.height - (transformedPoint.y - bbox.y);
                bbox.y = transformedPoint.y;
                break;
            case 'bottom-left':
                scalePointX = bbox.x + bbox.width;
                scalePointY = bbox.y;
                bbox.width = bbox.width - (transformedPoint.x - bbox.x);
                bbox.height = transformedPoint.y - bbox.y;
                bbox.x = transformedPoint.x;
                break;
            case 'bottom-right':
                scalePointX = bbox.x;
                scalePointY = bbox.y;
                bbox.width = transformedPoint.x - bbox.x;
                bbox.height = transformedPoint.y - bbox.y;
                break;
        }

        this.updateHandlesCoordinates(bbox);
        this.updateBoundingBoxBorder();

        const scaleX = bbox.width / this.startBBox.width;
        const scaleY = bbox.height / this.startBBox.height;

        this.svgElement.setAttribute('transform',
            `translate(${scalePointX}, ${scalePointY}) scale(${scaleX}, ${scaleY}) translate(${-scalePointX}, ${-scalePointY})`);
    }

    updateHandlesCoordinates(bbox) {
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

    createBoundingBoxBorder() {
        const existingLines = this.bBoxGroup.querySelectorAll('line');
        existingLines.forEach(line => this.bBoxGroup.removeChild(line));

        this.topLeft = this.bBoxGroup.querySelector('#top-left');
        this.topRight = this.bBoxGroup.querySelector('#top-right');
        this.bottomLeft = this.bBoxGroup.querySelector('#bottom-left');
        this.bottomRight = this.bBoxGroup.querySelector('#bottom-right');

        this.topLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.createLine(this.topLine, this.topLeft, this.topRight);
        this.bBoxGroup.appendChild(this.topLine);

        this.rightLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.createLine(this.rightLine, this.topRight, this.bottomRight);
        this.bBoxGroup.appendChild(this.rightLine);

        this.bottomLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.createLine(this.bottomLine, this.bottomRight, this.bottomLeft);
        this.bBoxGroup.appendChild(this.bottomLine);

        this.leftLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.createLine(this.leftLine, this.bottomLeft, this.topLeft);
        this.bBoxGroup.appendChild(this.leftLine);
    }

    createLine(line, startPoint, lastPoint) {
        line.setAttribute('x1', startPoint.getAttribute('cx'));
        line.setAttribute('y1', startPoint.getAttribute('cy'));
        line.setAttribute('x2', lastPoint.getAttribute('cx'));
        line.setAttribute('y2', lastPoint.getAttribute('cy'));
        line.setAttribute('stroke', '#6189ef');
        line.setAttribute('stroke-width', '2');
    }

    updateBoundingBoxBorder() {
        this.createLine(this.topLine, this.topLeft, this.topRight);
        this.createLine(this.rightLine, this.topRight, this.bottomRight);
        this.createLine(this.bottomLine, this.bottomRight, this.bottomLeft);
        this.createLine(this.leftLine, this.bottomLeft, this.topLeft);
    }
}
