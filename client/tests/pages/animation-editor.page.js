    const { $ } = require('@wdio/globals')
    const Page = require('./page');


    class AnimationEditor extends Page {

        get shapeTool(){
            return $('#AErect')
        }

        async drawShape(startX, startY, endX, endY) {
            await browser.performActions([{
                type: 'pointer',
                id: 'mouse',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 500, origin: 'pointer', x: endX - startX, y: endY - startY },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            
            await browser.releaseActions();
            await browser.pause(1000);
        }

        async getSVGElementByDataTool(tool) {
            return await $(`[data-tool="true"]`);
        }
    
        async clickOnSVGElement(tool) {
            const svgElement = await this.getSVGElementByDataTool(tool);
            await svgElement.click();
        }
    
        async clickFrameActivationButton() {
            const button = await $('#frameActivationBtn');
            await button.click();
        }

        async setInputValue(inputId, value) {
            const input = await $(`#${inputId}`);
            await input.setValue(value);
        }
    
        async getInputClass(inputId) {
            const input = await $(`#${inputId}`);
            return await input.getAttribute('class');
        }

        async moveThumbEndTime(offsetX) {
            const thumb = await $('.thumb-end-time');
            await thumb.dragAndDrop({ x: 150, y: 0 });
        }

        async checkTimelineItem() {
            const timelineItem = await $('.timeline-item');
            return await timelineItem.isDisplayed();
        }
        
        get thicknessSlider() {
            return $('#line-width'); 
        }

        get clearCanvasButton() {
            return $('#clearCanvasBtnAE'); 
        }

        get saveModal(){
            return $('.input-modal')
        }
        get saveModalBtn(){
            return $('.button-modal.btn.btn-secondary')
        }

        get saveButton() {
            return $('#saveBtnAE'); 
        }

        get uploadImageButton() {
            return $('#fileInput');
        }


        async selectShapeTool() {
            await this.shapeTool.click();
        }

        async changeThickness(value) {
            await this.thicknessSlider.setValue(value);
        }


        async saveDrawing(fileName) {
            await this.saveButton.click();
            await this.saveModal.setValue(fileName);
            await this.saveModalBtn.click();
        }

        async clearCanvas() {
            await this.clearCanvasButton.click();
        }

        open () {
            return super.open('animation-editor');
        }
    }

    module.exports = new AnimationEditor();
