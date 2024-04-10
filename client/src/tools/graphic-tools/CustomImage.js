import Tool from "./Tool";
export default class CustomImage extends Tool{

    constructor(canvas) {
        super(canvas);
        this.listen()
        // this.img.src = 'client/src/assets/img/hills.png';
        // console.log(this.img)
    }
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
        let img = new Image();
        // img.src = 'client/src/assets/img/hills.png';
        this.ctx.drawImage(img, 0, 0);

    }


}