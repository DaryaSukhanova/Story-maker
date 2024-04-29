import {makeAutoObservable} from "mobx";
import {logDOM} from "@testing-library/react";
import timelineBlockState from "./timelineBlockState";
import animationToolState from "./animationToolState";

class SvgToolState{
    tool = null
    isDrawn = false
    stroke = "1"
    strokeColor: "black"
    fillColor: "black"

    constructor() {
        makeAutoObservable(this)
    }
    setSvgTool(tool){
        this.tool = tool
        animationToolState.tool = null
    }

    // setFillStroke(color){
    //     if(this.tool){
    //         this.tool.svgFillStroke = color
    //     }
    // }
    setFillColor(color){
        // this.fillColor = color
        this.tool.svgFillColor = color
    }
    setStroke(stroke){
        // this.stroke = stroke
        this.tool.svgLineWidth = stroke
    }
    setStrokeColor(color){
        // this.strokeColor = color
        if(this.tool){
            this.tool.svgFillStroke = color
        }

    }

    setIsDrawnSvg(bool){
        this.isDrawn = bool
    }

    // setLineWidth(width){
    //     this.tool.svgLineWidth = width
    // }
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