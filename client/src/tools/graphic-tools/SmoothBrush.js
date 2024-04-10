import Tool from "./Tool";
export default class SmoothBrush extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen()
    }
    points = []
    counter = 0
    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false
        this.ctx.globalAlpha = 1
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        this.lastPoint = { x: e.clientX- e.target.offsetLeft, y: e.clientY - e.target.offsetTop };
    }
    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }
    hexToRgb(hex) {
        // Удаляем символ # из начала строки, если он присутствует
        hex = hex.replace(/^#/, '');

        // Разбиваем строку на составляющие красный, зеленый и синий
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Возвращаем объект с компонентами RGB
        return { r, g, b };
    }
    mouseMoveHandler(e) {
        if (!this.mouseDown) return;

        let currentPoint = { x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop };
        let dist = this.distanceBetween(this.lastPoint, currentPoint);
        let angle = this.angleBetween(this.lastPoint, currentPoint);

        this.ctx.beginPath();

        // Увеличиваем прозрачность
        this.ctx.globalAlpha = 0.4;
        this.color = this.hexToRgb(this.ctx.strokeStyle)

        for (let i = 0; i < dist; i += 5) {
            this.x = this.lastPoint.x + (Math.sin(angle) * i);
            this.y = this.lastPoint.y + (Math.cos(angle) * i);

            this.radgrad = this.ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 50); // Увеличиваем радиус размытия

            this.radgrad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.2)`);
            this.radgrad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.2)`);
            this.radgrad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

            this.ctx.fillStyle = this.radgrad;
            this.ctx.fillRect(this.x - 50, this.y - 50, 100, 100); // Рисуем квадрат, чтобы создать эффект размытия
        }
        this.ctx.globalAlpha = 1
        this.lastPoint = currentPoint;
    }

}