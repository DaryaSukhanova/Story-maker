import Tool from "./Tool";
export default class Bubbles extends Tool{

    constructor(canvas) {
        super(canvas);
        this.listen()
    }
    points = [ ]
    radius = 15;
    counter = 0;
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
        this.points.length = 0;
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.points.push({
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            radius: this.getRandomInt(10, 30),
            opacity: Math.random()
        });
    }
    point = null
    mouseMoveHandler(e){
        if (!this.mouseDown) return;
        if (this.counter%5 ===0){
            this.point = {
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
                radius: this.getRandomInt(5, 20),
                opacity: Math.random()
            };

            this.ctx.beginPath();
            this.ctx.globalAlpha = this.point.opacity;
            this.ctx.arc(
                this.point.x, this.point.y, this.point.radius,
                0, Math.PI * 2, false);
            this.ctx.fill();
        }
        this.counter++

    }

}