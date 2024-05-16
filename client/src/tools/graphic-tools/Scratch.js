import Tool from "./Tool";
export default class Scratch extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen()
    }
    lastPoint
    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        this.mouseDown = true
        const pos = this.getMousePos(e);
        this.lastPoint = { x: pos.x, y: pos.y };
    }
    mouseMoveHandler(e){
        if (!this.mouseDown) return;

        this.ctx.beginPath();
        const pos = this.getMousePos(e);
        this.ctx.moveTo(this.lastPoint.x - this.getRandomInt(0, 3), this.lastPoint.y - this.getRandomInt(0, 3));
        this.ctx.lineTo(pos.x - this.getRandomInt(0, 3), pos.y - this.getRandomInt(0, 3));
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + this.getRandomInt(0, 3), this.lastPoint.y + this.getRandomInt(0, 3));
        this.ctx.lineTo(pos.x + this.getRandomInt(0, 3), pos.y + this.getRandomInt(0, 3));
        this.ctx.stroke();

        this.lastPoint = { x: pos.x, y: pos.y };
    }

}