import {makeAutoObservable} from "mobx";
import {logDOM} from "@testing-library/react";

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
        console.log("svg Tool State", color)
        this.tool.svgFillStroke = color
    }


    setLineWidth(width){
        this.tool.svgLineWidth = width
    }
}

export default new SvgToolState()