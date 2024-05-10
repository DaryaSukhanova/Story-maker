import {makeAutoObservable} from "mobx";
import {logDOM} from "@testing-library/react";
import timelineBlockState from "./timelineBlockState";
import animationToolState from "./animationToolState";

class SvgToolState{
    tool = null
    isDrawn = false
    stroke = "1"
    strokeColor = "black"
    fillColor = "black"

    constructor() {
        makeAutoObservable(this)
    }
    setSvgTool(tool) {
        if (animationToolState.tool) {
            animationToolState.clearActiveTool();  // Сброс текущего инструмента анимации
        }
        this.tool = tool;
        this.tool.listen();  // Активация событий нового SVG инструмента
    }

    clearActiveTool() {
        if (this.tool) {
            this.clearBoundingBox()
            this.tool.destroyEvents();  // Очистка событий текущего SVG инструмента
        }
        this.tool = null;
    }


    setFillColor(color){
        // this.fillColor = color
        if(this.tool){
            this.tool.svgFillColor = color
        }
        
    }
    setStroke(stroke){
        // this.stroke = stroke
        if(this.tool){
            this.tool.svgLineWidth = stroke
        }
        
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
        const boundingBoxGroups = document.querySelectorAll('[data-bBoxGroup]');

        if (boundingBoxGroups) {
            boundingBoxGroups.forEach(group => {
                group.remove();
            });
        }
    }
}

export default new SvgToolState()