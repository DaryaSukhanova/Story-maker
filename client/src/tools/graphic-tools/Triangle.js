import Tool from "./Tool";

export default class Triangle extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        const pos = this.getMousePos(e);
        this.mouseDown = true
        this.ctx.beginPath() //говорит о том что мы начали рисовать новую линию
        this.startX = pos.x
        this.startY = pos.y
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            const pos = this.getMousePos(e);
            let currentX = pos.x
            let currentY = pos.y

            this.draw(currentX, currentY)
        }
    }

    draw(x, y){
        const img =  new Image()
        img.src = this.saved
        img.onload = ()=>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.lineTo(this.startX*2-x, y)
            this.ctx.closePath()
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}