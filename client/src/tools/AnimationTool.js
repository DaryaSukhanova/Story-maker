export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.destroyEvents();
    }

    destroyEvents() {
        // Проверка наличия элемента перед установкой событий
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;

    }
}