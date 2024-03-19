import {makeAutoObservable} from "mobx";
import {logDOM} from "@testing-library/react";

class SvgToolState{
    tool = null
    isDrawn = false
    constructor() {
        makeAutoObservable(this)
    }
    setSvgTool(tool){
        this.tool = tool
    }
    setFillColor(color){
        if(this.tool){
            this.tool.svgFillColor = color
        }

    }
    setFillStroke(color){
        if(this.tool){
            this.tool.svgFillStroke = color
        }

    }

    setIsDrawnSvg(bool){
        this.isDrawn = bool
    }

    setLineWidth(width){
        this.tool.svgLineWidth = width
    }
    clearBoundingBox() {
        // const boundingBoxGroup = document.getElementById("boundingBoxGroup");
        const boundingBoxGroup = document.getElementById("bBoxGroup");

        if (boundingBoxGroup && boundingBoxGroup.parentNode) {
            // boundingBoxGroup.parentNode.removeChild(boundingBoxGroup);
            boundingBoxGroup.remove();
        }
    }
}

export default new SvgToolState()