export default class AnimationMotionCurveController {
    constructor() {
        this.requestId = null;
        this.distanceCovered = 0;
    }

    initializeAnimation(element, path, duration, useFlag = true, isRunningThumb = false, timelineBlockState = null) {
       
        const pathLength = path.length(); // Общая длина пути
        let startTime = null; // Время начала текущего цикла анимации

        // Проверка корректности параметров
        if (!element || !path || pathLength <= 0) return;
        if (duration <= 0) {
            console.error('Animation duration must be greater than zero');
            return;
        }

        const pixelsPerMs = pathLength / (duration * 1000); // Скорость движения в пикселях за миллисекунду

        // Функция анимации
        const animate = (timestamp) => {
            if (useFlag && !isRunningThumb) {
                startTime = null;
                return;
            }

            // Устанавливаем начальное время или корректируем его после паузы
            if (startTime === null) {
                startTime = timestamp;
            }

            // Вычисляем прошедшее время с момента начала
            let elapsedTime;
            if (useFlag && timelineBlockState) {
                elapsedTime = timelineBlockState.elapsedTime;
            } else {
                elapsedTime = timestamp - startTime;
            }

            // Рассчитываем новое расстояние с учетом сохраненного
            this.distanceCovered = elapsedTime * pixelsPerMs;

            // Обеспечиваем цикличность анимации
            if (this.distanceCovered >= pathLength) {
                console.log('Animation completed, restarting...');
                this.distanceCovered = this.distanceCovered % pathLength; // Перезапускаем движение с начала
                startTime = timestamp; // Перезапускаем отсчёт времени
            }

            // Перемещаем элемент
            const point = path.pointAt(this.distanceCovered);
            if (element) {
                element.center(point.x, point.y);
            }

            // Запланировать следующий кадр
            this.requestId = requestAnimationFrame(animate);
        };

        // Отменяем предыдущий кадр, если он запланирован
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }

        // Запускаем анимацию
        this.requestId = requestAnimationFrame(animate);
    }

    stopAnimation() {
        // Останавливает текущую анимацию
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
}