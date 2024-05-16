import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        const pos = this.getMousePos(e);
        this.ctx.moveTo(pos.x, pos.y);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const pos = this.getMousePos(e);
            this.draw(pos.x, pos.y);
        }
    }


    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}
