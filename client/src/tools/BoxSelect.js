import SvgTool from "./SvgTool";

export default class BoxSelect extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen()
    }

    listen() {

        // this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        // this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseDownHandler(event) {
        const x = event.clientX;
        const y = event.clientY;

        // Находим элемент под указанными координатами
        const clickedElement = document.elementFromPoint(x, y);
        if (!(clickedElement.getAttribute('data-tool') === 'true')) {
            // Элемент не является экземпляром SvgTool, прекращаем выполнение
            return;
        }
        console.log(clickedElement)
    }
}