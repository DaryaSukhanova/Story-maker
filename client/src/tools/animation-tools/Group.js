import SvgTool from "./SvgTool";
import { SVG, G } from "@svgdotjs/svg.js";
import {logDOM} from "@testing-library/react";  // Импортируем необходимые компоненты из svg.js

export default class Group extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        // Убедимся, что svgCanvas - это SVG.js объект.
        this.svg = SVG(svgCanvas) || SVG().addTo(svgCanvas).size('100%', '100%');
        this.group = this.svg.group();  // Создаем группу внутри SVG-объекта
        this.group.attr('data-tool', 'true');


        this.bboxRect = null;
        this.bboxRects = [];
        this.listen();
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (event.keyCode === 27) {  // Код клавиши Esc
            this.clearBBoxes();  // Удалить все bbox
        }
    }

    mouseUpHandler(event) {
        const target = event.target.instance;  // Получаем SVG.js объект, который был кликнут
        if (target) {
            const isDataTool = target.attr('data-tool');
            if (isDataTool === 'true') {
                this.group.add(target);  // Добавляем элемент в группу
                console.log('Element added to the group:', target);

                // Получаем bbox текущего элемента
                const bbox = target.bbox();
                // Создаем прямоугольник вокруг элемента с синей границей
                this.bboxRect = this.svg.rect(bbox.width, bbox.height)
                    .move(bbox.x, bbox.y)
                    .fill('none')
                    .stroke({ width: 2, color: '#8DADFF' }
                    );
                this.bboxRect.attr('data-bBoxGroup', 'true')
                this.bboxRects.push(this.bboxRect);  // Добавляем bbox в массив
            }


        }
    }

    clearBBoxes() {
        if (this.bboxRects) {
            this.bboxRects.forEach(rect => rect.remove());
            this.bboxRects = [];
        }
    }

}