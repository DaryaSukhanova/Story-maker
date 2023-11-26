class MovingSquareAnimation {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.square = null;
        this.positionX = 0;
        this.direction = 1;
        this.startAnimation();
    }

    startAnimation = () => {
        // Проверяем, является ли this.svgCanvas DOM-элементом
        if (!(this.svgCanvas instanceof Element)) {
            console.error('Invalid SVG Canvas provided to MovingSquareAnimation');
            return;
        }

        // Создаем SVG-элемент квадрата
        this.square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.square.setAttribute("width", "50");
        this.square.setAttribute("height", "50");
        this.square.setAttribute("fill", "blue");

        try {
            // Пытаемся добавить элемент к SVG-документу
            this.svgCanvas.appendChild(this.square);
        } catch (error) {
            console.error('Error appending child:', error);
        }

        const animate = () => {
            this.positionX += 5 * this.direction;

            if (this.positionX > 200) {
                this.direction = -1;
            } else if (this.positionX < 0) {
                this.direction = 1;
            }

            this.square.setAttribute("transform", `translate(${this.positionX}, 0)`);
            requestAnimationFrame(animate);
        };

        animate();
    };
}

export default MovingSquareAnimation;
