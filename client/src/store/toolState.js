import {makeAutoObservable} from "mobx";

class ToolState{
    tool = null
    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool){
        this.tool = tool
    }
    setFillColor(color){
        if(this.tool){
            this.tool.fillColor = color
        }

    }
    setFillStroke(color){
        if(this.tool){
            this.tool.strokeColor = color
        }

    }
    setLineWidth(width){
        this.tool.lineWidth = width
    }
}

export default new ToolState()