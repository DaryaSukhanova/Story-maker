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
        this.lastPoint = { x: e.pageX - e.target.offsetLeft, y: e.pageY - e.target.offsetTop };
    }
    mouseMoveHandler(e){
        if (!this.mouseDown) return;

        this.ctx.beginPath();

        this.ctx.moveTo(this.lastPoint.x - this.getRandomInt(0, 3), this.lastPoint.y - this.getRandomInt(0, 3));
        this.ctx.lineTo(e.pageX - e.target.offsetLeft - this.getRandomInt(0, 3), e.pageY - e.target.offsetTop - this.getRandomInt(0, 3));
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + this.getRandomInt(0, 3), this.lastPoint.y + this.getRandomInt(0, 3));
        this.ctx.lineTo(e.pageX - e.target.offsetLeft + this.getRandomInt(0, 3), e.pageY - e.target.offsetTop + this.getRandomInt(0, 3));
        this.ctx.stroke();

        this.lastPoint = { x: e.pageX - e.target.offsetLeft, y: e.pageY - e.target.offsetTop };
    }

}