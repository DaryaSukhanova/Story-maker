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
        const pos = this.getMousePos(e);
        this.lastPoint = { x: pos.x, y: pos.y };
    }

    mouseMoveHandler(e) {
        if (!this.mouseDown) return;
        this.ctx.beginPath();
        const pos = this.getMousePos(e);
        this.ctx.globalAlpha = 1;
        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x - 4, this.lastPoint.y - 4 );
        this.ctx.lineTo(pos.x - 4, pos.y - 4);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x - 2, this.lastPoint.y - 2);
        this.ctx.lineTo(pos.x - 2,pos.y - 2);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + 2, this.lastPoint.y + 2 );
        this.ctx.lineTo(pos.x + 2, pos.y + 2);
        this.ctx.stroke();

        this.ctx.moveTo(this.lastPoint.x + 4, this.lastPoint.y + 4 );
        this.ctx.lineTo(pos.x + 4, pos.y + 4);
        this.ctx.stroke();
        this.ctx.lineWidth = 3
        this.lastPoint = { x: pos.x, y: pos.y};

    }

}