const path = require('path');
// const { expect } = require('expect');
const AnimationEditor = require('../pages/animation-editor.page');

describe('Animation Editor Tests', () => {
    before(async () => {
        
        // Авторизация и переход к графическому редактору
        await browser.url('http://localhost:3000/home'); // Замените на ваш URL home страницы
        const loginPage = require('../pages/login-storymaker.page');

        await loginPage.enter();
        await loginPage.login('darya.sukh32@mail.ru', '123456');
        await loginPage.openAnimationEditor();

        // Убедимся, что мы находимся на странице графического редактора
        const url = await browser.getUrl();
        expect(url).toContain('/animation-editor');
    });


    it('should interact with thickness', async () => {
        await AnimationEditor.selectShapeTool();
        await AnimationEditor.changeThickness(15);
    });

    it('should draw a shape on the canvas', async () => {
        await AnimationEditor.selectShapeTool();
        await AnimationEditor.drawShape(500, 500, 700, 700);

        // Проверка, что фигура была нарисована (например, можно проверить наличие SVG элемента)
        const svgElement = await $('svg');
        const isDisplayed = await svgElement.isDisplayed();
        expect(isDisplayed).toBe(true);

        // const isTimelineItemDisplayed = await AnimationEditor.checkTimelineItem();
        // expect(isTimelineItemDisplayed).toBe(true);
    });

    it('should set valid and invalid input values and check for error class', async () => {
        
        await AnimationEditor.clickOnSVGElement('rect'); // Используйте значение атрибута data-tool для выбора элемента
        await AnimationEditor.clickFrameActivationButton(); // Клик по кнопке после клика на SVG-элемент
        await AnimationEditor.moveThumbEndTime(50);

        // await AnimationEditor.addKeyframe();
        const validValue = '10';
        const invalidValue = '<invalid name>';

        // Установка валидного значения
        await AnimationEditor.setInputValue('scaleInputX', validValue);
        let inputClass = await AnimationEditor.getInputClass('angleInputDeg');
        expect(inputClass).not.toContain('input-error');

        // Установка невалидного значения
        await AnimationEditor.setInputValue('angleInputDeg', invalidValue);
        inputClass = await AnimationEditor.getInputClass('angleInputDeg');
        expect(inputClass).toContain('input-error');

    });


    it('should save and clear the canvas', async () => {
        // Сохраняем рисунок
        await AnimationEditor.saveDrawing('TestAnimation');

        // Очищаем холст
        await AnimationEditor.clearCanvas();

        // Ожидаем, что модальное окно закроется после сохранения   
        await browser.pause(1000); // Временная задержка для наблюдения за результатом
    });

    it('should show an error message for invalid input', async () => {
        
        // Пытаемся сохранить рисунок с неверным именем
        await AnimationEditor.saveDrawing('<invalid name>');

        // Ожидаем, что сообщение об ошибке будет отображено
        const errorMessageElement = await $('.modal-body p');
        const errorMessage = await errorMessageElement.getText();
        expect(errorMessage).toBe('Неверное название. Пожалуйста, убедитесь, что оно содержит только буквы, цифры, дефисы и подчеркивания.');

        // Закрываем модальное окно
        const closeButton = AnimationEditor.saveModalBtn
        await closeButton.click();

        // Ожидаем, что модальное окно закроется после нажатия на кнопку закрытия   
        await browser.pause(1000); // Временная задержка для наблюдения за результатом
    });
});
