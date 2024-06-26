import canvasState from "../../store/canvasState";

export default class Tool{
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
        this.ctx.strokeStyle = null
        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.globalAlpha = 1
    }

    set fillColor(color){
        this.ctx.fillStyle = color
    }

    set strokeColor(color){
        this.ctx.strokeStyle = color
    }

    set lineWidth(width){
        this.ctx.lineWidth = width
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }

    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}