import Tool from "./Tool";
export default class Pencil extends Tool{
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
        this.points.length = 0;
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.points = [ ];
        this.points.push({ x: e.pageX - e.target.offsetLeft, y: e.pageY - e.target.offsetTop });
    }
    mouseMoveHandler(e){
        if (!this.mouseDown) return;
        this.points.push({ x: e.pageX - e.target.offsetLeft, y: e.pageY - e.target.offsetTop });
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[this.points.length - 2].x, this.points[this.points.length - 2].y);
        this.ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
        this.ctx.stroke();
        if (this.counter%4 === 0){
            for (let i = 0, len = this.points.length; i < len; i++) {
                let dx = this.points[i].x - this.points[this.points.length-1].x;
                let dy = this.points[i].y - this.points[this.points.length-1].y;
                let d = dx * dx + dy * dy;
                if (d < 1500) {
                    this.ctx.beginPath();
                    this.ctx.globalAlpha = 0.2;
                    this.ctx.moveTo( this.points[this.points.length-1].x + (dx * 0.2), this.points[this.points.length-1].y + (dy * 0.2));
                    this.ctx.lineTo( this.points[i].x - (dx * 0.2), this.points[i].y - (dy * 0.2));
                    this.ctx.stroke();
                }
            }
        }
        this.counter++
    }

}