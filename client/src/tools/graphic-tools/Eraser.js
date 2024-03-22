import Brush from "./Brush";
export default class Eraser extends Brush{
    constructor(canvas) {
        super(canvas);
        this.ctx.globalCompositeOperation = 'destination-out'
    }

    draw(x, y){
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}