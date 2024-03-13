import {makeAutoObservable} from "mobx";
import {useRef} from "react";

class layerState{
    constructor() {
        makeAutoObservable(this)
    }

    layers = [
        { name: 'Layer1', ref: null, isActive: false, isVisible: true },
        { name: 'Layer2', ref: null, isActive: false, isVisible: true }
    ]
    setLayers (currentLayers){
        this.layers = currentLayers;
    }
    addLayer(newLayerRef) {
        if (this.layers.length < 9){
            const newLayerName = `Layer${this.layers.length + 1}`;
            this.layers.push({ name: newLayerName, ref: newLayerRef, isActive: false, isVisible: true });
        }

    }
    setActiveLayer(index) {
        this.layers.forEach((layer, i) => {
            layer.isActive = (i === index);
        });
    }
    setVisibleLayer(index){
        this.layers[index].isVisible = !this.layers[index].isVisible
    }
    removeLayer(index) {
        if (index >= 0 && index < this.layers.length) {
            this.layers.splice(index, 1);
        }
    }
}

export default new layerState()