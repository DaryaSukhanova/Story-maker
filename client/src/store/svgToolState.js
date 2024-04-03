import {makeAutoObservable} from "mobx";
import {logDOM} from "@testing-library/react";
import timelineBlockState from "./timelineBlockState";

class SvgToolState{
    tool = null
    isDrawn = false
    stroke = "1"
    strokeColor: "black"
    fillColor: "black"
    svgElements = []
    constructor() {
        makeAutoObservable(this)
    }
    setSvgTool(tool){
        this.tool = tool
    }
    setFillColor(color){
        // if(this.tool){
            // this.tool.svgFillColor = color
            this.fillColor = color
        // }
    }
    setFillStroke(color){
        if(this.tool){
            this.tool.svgFillStroke = color
        }
    }
    setStroke(stroke){
        this.stroke = stroke
    }
    setStrokeColor(color){
        this.strokeColor = color
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
    pushToSvgElements(element) {
        this.svgElements.push(element);

        // Добавляем обработчик события клика для каждого элемента
        element.on('click', () => {
            // Выполняем действия при клике на элемент
            timelineBlockState.setActiveElement(element);
            console.log(this.svgElements);
            console.log("activeElement", timelineBlockState.activeElement)
        });
    }
}

export default new SvgToolState()