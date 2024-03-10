import {makeAutoObservable} from "mobx";
import {useRef} from "react";

class layerState{
    constructor() {
        makeAutoObservable(this)
    }

    layers = [
        { name: 'Layer1', ref: null },
        { name: 'Layer2', ref: null }
    ]
    setLayers (currentLayers){
        this.layers = currentLayers;
    }
    addLayer(newLayerRef) {
        const newLayerName = `Layer${this.layers.length + 1}`;
        this.layers.push({ name: newLayerName, ref: newLayerRef });
    }
}

export default new layerState()