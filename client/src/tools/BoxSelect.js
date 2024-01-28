import SvgTool from "./SvgTool";

export default class BoxSelect extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // this.resetBoundingBox();
        this.listen();
        this.boundingBoxRect = null;
        this.isDragging = false;
        this.selectedHandle = null;
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

            // Проверяем, что выбрана ручка и bounding box существует
            if (this.selectedHandle && this.boundingBoxRect) {
                const svgPoint = this.svgCanvas.createSVGPoint();
                svgPoint.x = x;
                svgPoint.y = y;

                // Преобразуем координаты экрана в координаты SVG
                const transformedPoint = svgPoint.matrixTransform(this.svgCanvas.getScreenCTM().inverse());

                // Размеры bounding box до изменений
                const rectBBox = this.boundingBoxRect.getBBox();
                const initialWidth = rectBBox.width
                const initialHeight = rectBBox.height

                // Изменяем размеры bounding box в зависимости от выбранной ручки
                switch (this.selectedHandle.id) {
                    case 'top-left':
                        this.boundingBoxRect.setAttribute('x', transformedPoint.x);
                        this.boundingBoxRect.setAttribute('y', transformedPoint.y);
                        this.boundingBoxRect.setAttribute('width', rectBBox.width - (transformedPoint.x - rectBBox.x));
                        this.boundingBoxRect.setAttribute('height', rectBBox.height - (transformedPoint.y - rectBBox.y));
                        break;
                    case 'top-right':
                        this.boundingBoxRect.setAttribute('y', transformedPoint.y);
                        this.boundingBoxRect.setAttribute('width', transformedPoint.x - rectBBox.x);
                        this.boundingBoxRect.setAttribute('height', rectBBox.height - (transformedPoint.y - rectBBox.y));
                        break;
                    case 'bottom-left':
                        this.boundingBoxRect.setAttribute('x', transformedPoint.x);
                        this.boundingBoxRect.setAttribute('width', rectBBox.width - (transformedPoint.x - rectBBox.x));
                        this.boundingBoxRect.setAttribute('height', transformedPoint.y - rectBBox.y);
                        break;
                    case 'bottom-right':
                        this.boundingBoxRect.setAttribute('width', transformedPoint.x - rectBBox.x);
                        this.boundingBoxRect.setAttribute('height', transformedPoint.y - rectBBox.y);
                        break;
                }

                const handles = this.svgCanvas.querySelectorAll('.resize-handle');
                handles.forEach(handle => {
                    switch (handle.id) {
                        case 'top-left':
                            handle.setAttribute('cx', parseFloat(this.boundingBoxRect.getAttribute('x')));
                            handle.setAttribute('cy', parseFloat(this.boundingBoxRect.getAttribute('y')));
                            break;
                        case 'top-right':
                            handle.setAttribute('cx', parseFloat(this.boundingBoxRect.getAttribute('x')) + parseFloat(this.boundingBoxRect.getAttribute('width')));
                            handle.setAttribute('cy', parseFloat(this.boundingBoxRect.getAttribute('y')));
                            break;
                        case 'bottom-left':
                            handle.setAttribute('cx', parseFloat(this.boundingBoxRect.getAttribute('x')));
                            handle.setAttribute('cy', parseFloat(this.boundingBoxRect.getAttribute('y')) + parseFloat(this.boundingBoxRect.getAttribute('height')));
                            break;
                        case 'bottom-right':
                            handle.setAttribute('cx', parseFloat(this.boundingBoxRect.getAttribute('x')) + parseFloat(this.boundingBoxRect.getAttribute('width')));
                            handle.setAttribute('cy', parseFloat(this.boundingBoxRect.getAttribute('y')) + parseFloat(this.boundingBoxRect.getAttribute('height')));
                            break;
                    }
                });

                const svgContent = document.querySelector('[data-tool="true"]');
                if (svgContent) {
                    const dx = transformedPoint.x - rectBBox.x;
                    const dy = transformedPoint.y - rectBBox.y;
                    const scaleX = rectBBox.width / initialWidth;
                    const scaleY = rectBBox.height / initialHeight;

                    const matrixValues = `${scaleX} 0 0 ${scaleY} ${dx} ${dy}`;
                    const matrixString = `matrix(${matrixValues})`;
                    svgContent.setAttribute('transform', matrixString);
                }

            }
        }
    }

    mouseUpHandler(event) {
        this.isDragging = false;

        const x = event.clientX;
        const y = event.clientY;

        // Находим элемент под указанными координатами
        const clickedElement = document.elementFromPoint(x, y);



    }
    mouseDownHandler(event) {
        const x = event.clientX;
        const y = event.clientY;

        // Находим элемент под указанными координатами
        const clickedElement = document.elementFromPoint(x, y);

        // if (!(clickedElement.getAttribute('data-tool') === 'true')) {
        //     if(clickedElement.getAttribute('id') !== 'boundingBoxGroup'){
        //         this.resetBoundingBox()
        //     }
        //     // Элемент не является экземпляром SvgTool, прекращаем выполнение
        //     return;
        // }
        if(!this.boundingBoxRect){
            this.getBoundingBox(clickedElement);
        }

        if (clickedElement.classList.contains('resize-handle')) {
            this.selectedHandle = clickedElement;
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
        handle.setAttribute("id", "boxHandle");
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
            { x: bbox.x, y: bbox.y, cursor: "nwse-resize", id: "top-left"},
            { x: bbox.x + bbox.width, y: bbox.y, cursor: "nesw-resize", id: "top-right"},
            { x: bbox.x, y: bbox.y + bbox.height, cursor: "nesw-resize", id: "bottom-left"},
            { x: bbox.x + bbox.width, y: bbox.y + bbox.height, cursor: "nwse-resize", id: "bottom-right" }
        ];
        handles.forEach(handleInfo => {
            const handle = this.createHandle(handleInfo.x, handleInfo.y, handleInfo.cursor);
            handle.setAttribute("id", handleInfo.id)
            currentGroup.appendChild(handle);

        });
    }

    handleResize(currentHandle){
        console.log("func", currentHandle.style)
        switch (currentHandle.style.cursor){
            case "nwse-resize":
                console.log("nwse-resize")
                break;
            case "nesw-resize":
                console.log("nesw-resize")
                break;
        }
    }
}
