const { $ } = require('@wdio/globals')
const Page = require('./page');


class GraphicEditor extends Page {

    get brushTool() {
        return $('#GEpen');
    }
    get shapeTool(){
        return $('#GErect')
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

    get colorPicker() {
        return $('.saturation-white');
    }

    get colorPickerInput() {
        return $('#colorPickerInput'); 
    }
    
    get thicknessSlider() {
        return $('#line-width'); 
    }

    get addLayerButton() {
        return $('#btnLayerAdd'); 
    }

    get deleteLayerButton() {
        return $('#btnLayerRemove'); 
    }

    get firstLayerButton() {
        return $('#layerBtn0'); 
    }

    get secondLayerButton() {
        return $('#layerBtn1');
    }

    get activeLayerButton() {
        return $('.active'); 
    }

    get clearCanvasButton() {
        return $('#clearCanvasBtnGE'); 
    }

    get saveModal(){
        return $('.input-modal')
    }
    get saveModalBtn(){
        return $('.button-modal.btn.btn-secondary')
    }

    get saveButton() {
        return $('#saveBtnGE'); 
    }

    get uploadImageButton() {
        return $('#fileInput');
    }


    async selectBrushTool() {
        await this.brushTool.click();
    }

    async selectShapeTool() {
        await this.shapeTool.click();
    }

    async openColorPicker() {
        await this.colorPicker.click();
    }

    async changeColor(color) {
        await this.openColorPicker();
        await this.colorPicker.setValue(color);
    }

    async changeThickness(value) {
        await this.thicknessSlider.setValue(value);
    }



    async selectLayer(layerNumber) {
        const layerButton = $(`#layerBtn${layerNumber}`);
        await layerButton.click();
    }
    async addLayer() {
        await this.addLayerButton.click();
    }

    async deleteLayer() {
        await this.deleteLayerButton.click();
    }

    async makeUploadInputVisible() {
        await browser.execute(() => {
            const fileInput = document.getElementById('fileInput');
            fileInput.style.display = 'block';
            fileInput.style.visibility = 'visible';
            fileInput.style.height = 'auto';
            fileInput.style.width = 'auto';
        });
    }

    async uploadImage(filePath) {
        await this.makeUploadInputVisible();
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.uploadImageButton.setValue(remoteFilePath);
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
        return super.open('graphic-editor');
    }
}

module.exports = new GraphicEditor();
