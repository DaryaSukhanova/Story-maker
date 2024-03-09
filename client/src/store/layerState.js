import {makeAutoObservable} from "mobx";

class layerState{
    constructor() {
        makeAutoObservable(this)
    }
    layers = {
        layer1: null,
        layer2: null
    };
    setLayerRef(layerName, ref) {
        this.layers[layerName] = ref;
    }
}

export default new layerState()