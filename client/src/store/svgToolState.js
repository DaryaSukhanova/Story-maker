import {makeAutoObservable} from "mobx";

class SvgToolState{
    tool = null
    constructor() {
        makeAutoObservable(this)
    }
    setSvgTool(tool){
        this.tool = tool
    }
    // setFillColor(color){
    //     this.tool.fillColor = color
    // }
    setFillStroke(color){
        this.tool.fillStroke = color
    }
    setLineWidth(width){
        this.tool.lineWidth = width
    }
}

export default new SvgToolState()