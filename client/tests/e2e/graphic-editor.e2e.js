const path = require('path');
// const { expect } = require('expect');
const GraphicEditor = require('../pages/graphic-editor.page');

describe('Graphic Editor Tests', () => {
    before(async () => {
        
        // Авторизация и переход к графическому редактору
        await browser.url('http://localhost:3000/home'); // Замените на ваш URL home страницы
        const loginPage = require('../pages/login-storymaker.page');

        await loginPage.enter();
        await loginPage.login('darya.sukh21@mail.ru', '123456');
        await loginPage.openGraphicEditor();

        // Убедимся, что мы находимся на странице графического редактора
        const url = await browser.getUrl();
        expect(url).toContain('/graphic-editor');
    });

    it('should upload a PNG file successfully', async () => {
        // Задаем путь к файлу PNG для загрузки
        const filePath = path.join(__dirname, 'testFiles/hills.png');

        // Загрузить файл
        await GraphicEditor.uploadImage(filePath);

        // Ожидание и проверка, что изображение было успешно загружено на холст
        const canvas = await $('#canvas0');
        const isImageLoaded = await canvas.isDisplayed();
        expect(isImageLoaded).toBe(true);
    });

    it('should show alert when non-PNG file is uploaded', async () => {
        const incorrectFilePath = path.join(__dirname, 'testFiles/test.txt');

        // Попытка загрузить файл
        await browser.execute(() => {
            window.alert = function (message) {
                document.body.setAttribute('data-alert-message', message);
            };
        });

        await GraphicEditor.uploadImage(incorrectFilePath);

        // Проверка, что появилось сообщение об ошибке
        const alertMessage = await $('body').getAttribute('data-alert-message');
        expect(alertMessage).toBe('Пожалуйста, загрузите файл формата PNG.');
    });

    it('should interact with color picker and thickness', async () => {
        await GraphicEditor.selectBrushTool();
        await GraphicEditor.selectShapeTool();

        // const color = '#ff0000'; // Красный цвет
        // await GraphicEditor.changeColor(color);

        // const inputColor = await GraphicEditor.colorPickerInput.getValue();
        // expect(inputColor).toBe(color);

        await GraphicEditor.changeThickness(10); // Толщина 10
    });

    it('should select and manipulate layers', async () => {

        await GraphicEditor.selectLayer(0);

        // Проверяем, что первый слой стал активным
        const firstLayerButton = await GraphicEditor.firstLayerButton;
        const firstLayerClass = await firstLayerButton.getAttribute('class');
        const isActive = firstLayerClass ? firstLayerClass.includes('active') : false;
        expect(isActive).toBe(true);

        // Выбираем второй слой
        await GraphicEditor.selectLayer(1);

        // Проверяем, что второй слой стал активным
        const secondLayerButton = await GraphicEditor.secondLayerButton;
        const secondLayerClass = await secondLayerButton.getAttribute('class');
        const isSecondLayerActive = secondLayerClass ? secondLayerClass.includes('active') : false;
        expect(isSecondLayerActive).toBe(true);

        // Проверяем, что первый слой больше не активен
        const firstLayerClassAfter = await firstLayerButton.getAttribute('class');
        const isFirstLayerActive = firstLayerClassAfter ? firstLayerClassAfter.includes('active') : false;
        expect(isFirstLayerActive).toBe(false);

        await GraphicEditor.addLayer();
        await GraphicEditor.deleteLayer();
    });

    it('should save and clear the canvas', async () => {
        // Сохраняем рисунок
        await GraphicEditor.saveDrawing('TestDrawing');

        // Очищаем холст
        await GraphicEditor.clearCanvas();

        // Ожидаем, что модальное окно закроется после сохранения   
        await browser.pause(1000); // Временная задержка для наблюдения за результатом
    });
});
