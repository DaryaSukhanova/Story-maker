const { $ } = require('@wdio/globals');
const Page = require('./page');

class LoginStoryMaker extends Page {
    // Selectors
    get btnEnter () {
        return $('a[href="/login"]');
    }

    get inputEmail () {
        return $('input[type="text"]');
    }

    get inputPassword () {
        return $('input[type="password"]');
    }

    get btnSubmit () {
        return $('.authorization__btn');
    }

    get linkGraphicEditor () {
        return $('a[href="/graphic-editor"]');
    }

    // Methods
    async enter () {
        await this.btnEnter.click();
    }

    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async openGraphicEditor () {
        const link = await this.linkGraphicEditor;
        await link.scrollIntoView();
        await link.waitForClickable({ timeout: 3000 });
        await link.click();
    }

    open () {
        return super.open('home');
    }
}

module.exports = new LoginStoryMaker();
