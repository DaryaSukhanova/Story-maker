import Tool from "./Tool";
export default class Highlighter extends Tool{
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
    }
    mouseDownHandler(e){
        this.mouseDown = true

        this.lastPoint = { x: e.clientX- e.target.offsetLeft, y: e.clientY - e.target.offsetTop };
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        this.ctx.beginPath();

        this.ctx.globalAlpha = 1;
        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x - 4, this.lastPoint.y - 4 );
        this.ctx.lineTo(e.clientX - 4 - e.target.offsetLeft, e.clientY - 4 - e.target.offsetTop);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x - 2, this.lastPoint.y - 2);
        this.ctx.lineTo(e.clientX - 2 - e.target.offsetLeft, e.clientY - 2 - e.target.offsetTop);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + 2, this.lastPoint.y + 2 );
        this.ctx.lineTo(e.clientX + 2 - e.target.offsetLeft, e.clientY + 2 - e.target.offsetTop);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + 4, this.lastPoint.y + 4 );
        this.ctx.lineTo(e.clientX + 4 - e.target.offsetLeft, e.clientY + 4 - e.target.offsetTop);
        this.ctx.stroke();
        this.ctx.lineWidth = 3
        this.lastPoint = { x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop};

    }

}