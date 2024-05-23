// const LoginStoryMaker = require('../pages/login-storymaker.page');

// describe('Authorization Test', () => {
//     it('should navigate to login page, perform login, and check graphic editor', async () => {
//         // Открываем стартовую страницу
//         await LoginStoryMaker.open();

//         // Нажимаем на кнопку "Войти" на стартовой странице
//         await LoginStoryMaker.enter();

//         // Ожидаем, что мы перешли на страницу авторизации
//         await browser.pause(1000); // Ожидание, чтобы страница загрузилась полностью
//         const url = await browser.getUrl();
//         expect(url).toContain('/login'); // Используем WebdriverIO expect для проверки URL

//         // Вводим email и пароль
//         const email = 'darya.sukh21@mail.ru';
//         const password = '123456'; 
//         await LoginStoryMaker.login(email, password);

//         await browser.pause(3000); // Временная задержка для наблюдения за результатом

//         // Нажимаем на ссылку "Графический редактор"
//         await LoginStoryMaker.openGraphicEditor();

//         // Ожидаем, что мы перешли на страницу графического редактора
//         await browser.pause(1000); // Ожидание, чтобы страница загрузилась полностью
//         const editorUrl = await browser.getUrl();
//         expect(editorUrl).toContain('/graphic-editor'); // Используем WebdriverIO expect для проверки URL

//         await browser.pause(3000); // Временная задержка для наблюдения за результатом
//     });
// });
