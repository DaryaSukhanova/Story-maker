import {makeAutoObservable} from "mobx";
import animationToolState from "./animationToolState";
import TimelineBlock from "../components/animation-components/TimelineBlock";
import svgToolState from "./svgToolState";
import SvgBrush from "../tools/animation-tools/SvgBrush";
import timelineBlockState from "./timelineBlockState";
import KeyFrameManager from "../tools/animation-tools/KeyFrameManager";



class SvgCanvasState{
    canvas = null
    undoList = [] //содержит все действие,которые мы делали
    redoList = [] //содержит те действия, которые мы отменили
    backgroundName = ""
    svgElements = []
    keyframes = []
    activeElement = null
    activeKey = null 

    constructor() {
        makeAutoObservable(this)
    }
    // Установка активного SVG элемента
    setActiveElement(elementId) {
        this.activeElement = elementId;
        console.log(this.activeElement)
    }

    // Установка активного ключа
    setActiveKey(keyId) {
        this.activeKey = keyId;
    }

    pushToSvgElements(element) {
        if (!this.canvas) return;

        const canvasRect = this.canvas.getBoundingClientRect();
        const bbox = element.bbox()

        const originX = (bbox.x + bbox.width / 2);
        const originY = (bbox.y + bbox.height / 2);
        const id = `${element.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        element.attr('id', id);

        const svgElementWrapper = {
            shape: element,
            id: id,
            isAnimated: false,
            keys: [],
            path: null,
            origin: {
                x: originX,
                y: originY
            }
        };

        this.svgElements.push(svgElementWrapper);
        console.log("this.svgElements", this.svgElements)
        timelineBlockState.setActiveElement(svgElementWrapper);
    }

    addKeyframeToElement(elementId) {
        const elementIndex = this.svgElements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) {
            console.error(`Element with ID ${elementId} not found.`);
            return;
        }

        // Создание нового ключевого кадра с уникальным идентификатором
        const newKey = {
            id: `key-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            duration: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            skewX: 0,
            skewY: 0
        };

        // Добавление ключевого кадра в соответствующий элемент SVG
        this.svgElements[elementIndex] = {
            ...this.svgElements[elementIndex],
            keys: [...this.svgElements[elementIndex].keys, newKey]
        };

        console.log(`Added new keyframe to element ${elementId}`, newKey);
    }

    removeKeyframeFromElement(elementId, keyId) {
        // Находим элемент по его ID
        const elementIndex = this.svgElements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) {
            console.error(`Element with ID ${elementId} не найден.`);
            return;
        }

        // Находим индекс ключа по его ID
        const keyIndex = this.svgElements[elementIndex].keys.findIndex(key => key.id === keyId);
        if (keyIndex === -1) {
            console.error(`Keyframe с ID ${keyId} не найден в элементе ${elementId}.`);
            return;
        }

        // Используем splice для удаления ключа по индексу
        this.svgElements[elementIndex].keys.splice(keyIndex, 1);

        console.log(`Удален keyframe ${keyId} из элемента ${elementId}`);
    }

    updateKeyframeField(elementId, keyId, field, value) {
        // Ищем индекс элемента в массиве svgElements
        const elementIndex = this.svgElements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) {
            console.error(`Element with ID ${elementId} not found.`);
            return;
        }

        // Ищем индекс ключевого кадра в массиве keys элемента
        const keyIndex = this.svgElements[elementIndex].keys.findIndex(key => key.id === keyId);
        if (keyIndex === -1) {
            console.error(`Keyframe with ID ${keyId} not found in element ${elementId}.`);
            return;
        }

        // Обновляем конкретное поле у ключевого кадра
        const updatedKeyframe = {
            ...this.svgElements[elementIndex].keys[keyIndex],
            [field]: value
        };

        // Обновляем массив ключевых кадров в элементе
        const updatedKeys = [
            ...this.svgElements[elementIndex].keys.slice(0, keyIndex),
            updatedKeyframe,
            ...this.svgElements[elementIndex].keys.slice(keyIndex + 1)
        ];

        // Обновляем сам элемент в массиве svgElements
        this.svgElements[elementIndex] = {
            ...this.svgElements[elementIndex],
            keys: updatedKeys
        };

        console.log(`Updated keyframe ${keyId} in element ${elementId}, set ${field} to ${value}`);
    }

    updateElementOrigin(elementId, position) {
        const element = this.svgElements.find(el => el.shape.node.id === elementId);
        console.log(element)
        if (element) {
            const bbox = element.shape.bbox();
            let newOrigin;
            switch (position) {
                case 'center':
                    newOrigin = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
                    break;
                case 'top-left':
                    newOrigin = { x: bbox.x, y: bbox.y };
                    break;
                case 'top-right':
                    newOrigin = { x: bbox.x + bbox.width, y: bbox.y };
                    break;
                case 'bottom-left':
                    newOrigin = { x: bbox.x, y: bbox.y + bbox.height };
                    break;
                case 'bottom-right':
                    newOrigin = { x: bbox.x + bbox.width, y: bbox.y + bbox.height };
                    break;
                default:
                    newOrigin = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
                    break;
            }
            element.origin = newOrigin;

                // Обновляем поле `origin` непосредственно в элементе
            const updatedElement = {
                ...element,
                origin: newOrigin
            };

            // Заменяем старый элемент на обновленный
            this.svgElements[elementId] = updatedElement;
            console.log(`Updated origin to ${position}:`, newOrigin);
        }
    }

    toggleAnimation(element) {
        const svgElement = this.svgElements.find(el => el.shape.node === element);
        console.log("svgElement", svgElement)
        if (svgElement) {
            svgElement.isAnimated = !svgElement.isAnimated;
        }
    }
    setSvgElements(arr){
        this.svgElements = arr
        console.log(this.svgElements)
    }

    setSvgCanvas(canvas){
        this.canvas = canvas
    }

    handleClearCanvas = () => {
        this.canvas.innerHTML = '';
        this.svgElements = [];
        svgToolState.setIsDrawnSvg(false)
        timelineBlockState.setIsRunningThumb(false)
        timelineBlockState.setTotalTime(0)
        timelineBlockState.setThumbEndPosition(0)
        timelineBlockState.setThumbCurrentPosition(0)
        timelineBlockState.setElapsedTime(0)

        const keyframeManager = new KeyFrameManager(this.canvas);
        if (keyframeManager) {
            keyframeManager.stopAnimations();
        }
    };
    
    updateElementPath(elementId, pathData) {
        const elementIndex = this.svgElements.findIndex(el => el.id === elementId);
        if (elementIndex === -1) {
            console.error(`Element with ID ${elementId} not found.`);
            return;
        }
        console.log(pathData)
        this.svgElements[elementIndex] = {
            ...this.svgElements[elementIndex],
            pathData: pathData
        };
        console.log(`Updated path for element ${elementId}`);
    }

}
export default new SvgCanvasState()