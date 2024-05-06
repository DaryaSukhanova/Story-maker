import {SVG} from "@svgdotjs/svg.js";
import SvgTool from "./SvgTool";
import canvas from "../../components/graphic-components/Canvas";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class Mover extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.listen();
        this.DrawingCanvas = SVG(document.getElementById("drawingCanvas"))
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const target = e.target;
        const isSvgElement = target.getAttribute('data-tool') === 'true';

        if (isSvgElement) {
            this.selectedElement = target.instance;
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.mouseDown = true;
        }
    }

    mouseMoveHandler(e) {
        if (this.mouseDown && this.selectedElement) {
            // Рассчитываем новые координаты элемента
            const dx = e.pageX - this.startX;
            const dy = e.pageY - this.startY;

            // Обновляем позицию элемента
            const currentX = parseFloat(this.selectedElement.x());
            const currentY = parseFloat(this.selectedElement.y());
            this.selectedElement.move(currentX + dx, currentY + dy);

            // Обновляем стартовые координаты для следующего события перемещения
            this.startX = e.pageX;
            this.startY = e.pageY;
        }
    }
    mouseUpHandler(e) {
        if (this.mouseDown) {
            this.mouseDown = false;
            this.selectedElement = null;
        }
    }

}