import {makeAutoObservable} from "mobx";
import {useRef} from "react";

class layerState{
    constructor() {
        makeAutoObservable(this)
    }

    layers = [
        { name: 'Layer1', ref: null, isActive: false },
        { name: 'Layer2', ref: null, isActive: false }
    ]
    setLayers (currentLayers){
        this.layers = currentLayers;
    }
    addLayer(newLayerRef) {
        if (this.layers.length < 9){
            const newLayerName = `Layer${this.layers.length + 1}`;
            this.layers.push({ name: newLayerName, ref: newLayerRef, isActive: false });
        }

    }
    setActiveLayer(index) {
        this.layers.forEach((layer, i) => {
            layer.isActive = (i === index);
        });
    }
    removeLayer() {
        if (this.layers.length > 1) {
            this.layers.pop();
        }
    }
}

export default new layerState()