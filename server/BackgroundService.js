import Background from "./Background.js";
import fs from "fs"
import path from "path"
import createError from 'http-errors'
class BackgroundService{
    // createId() {
    //     let id = 0
    //     const dir = fs.readdirSync(path.resolve('files'))
    //     if (dir.length !== 0){
    //         return id = id + dir.length
    //     }
    //     return id
    // }
    async create(background){
        const data = background.backgroundImage.replace(`data:image/png;base64,`, '')
        fs.writeFileSync(path.resolve('files', `${background.backgroundName}.png`), data, 'base64')
        const createdBackground = await Background.create({backgroundName: `${background.backgroundName}.png`})
        if (createdBackground === null){
            throw createError(500, `Server error`)
        }
        return createdBackground

    }
    async getAll(){
        const backgroundNames = await Background.find()
        const backgrounds = []
        backgroundNames.forEach((file) =>{
            const picture = fs.readFileSync(path.resolve('files', file.backgroundName))
            const image = `data:image/png;base64,` + picture.toString('base64')
            backgrounds.push(
                {
                    backgroundId: file._id,
                    backgroundName: file.backgroundName,
                    backgroundImage: image
                }
            )
        })

        return backgrounds
    }
    async getOne(name){
        if (!name){
            throw createError(400, `Bad Request`)
        }
        const backgroundNames = await Background.find()
        let background = 0
        backgroundNames.forEach((file) =>{
            if (name === file.backgroundName){
                const picture = fs.readFileSync(path.resolve('files', file.backgroundName))
                const image = `data:image/png;base64,` + picture.toString('base64')
                background =
                    {
                        backgroundId: file._id,
                        backgroundName: file.backgroundName,
                        backgroundImage: image
                    }
            }
        })
        console.log(background)
        if (background === 0){
            // throw new Error('background is not found')
            throw createError(404, `Background not found`)
        }
        return background

    }
    async update(background){
        if (!background.backgroundId){
            throw createError(400, `Bad Request`)
        }
        const updatedBackground = await Background.findByIdAndUpdate(
            background.backgroundId,
            {
                backgroundId: background.backgroundId,
                backgroundName: background.backgroundName
            },
            {new:true}
        )
        if (updatedBackground === null){
            throw createError(404, `Background not found`)
        }
        const data = background.backgroundImage.replace(`data:image/png;base64,`, '')
        fs.unlink(path.resolve('files', background.backgroundName), (err)=>{console.log(err)})
        fs.writeFileSync(path.resolve('files', background.backgroundName), data, 'base64')
        return background;

    }
    async delete(name) {
        if (!name) {
            throw createError(400, `Bad Request`)
        }
        const backgroundNames = await Background.find();
        let background = 0;
        for (const file of backgroundNames) {
            if (name === file.backgroundName) {
                fs.unlink(path.resolve('files', file.backgroundName), (err) => {
                    console.log(err);
                });
                background = await Background.findByIdAndDelete(file._id);
            }
        }
        if (background === 0) {
            throw createError(404, `Background not found`)
        }
        return background;
    }

    async saveFrames(frames) {
        try {
            const framesFolder = path.resolve('frames');
            // Проверяем, существует ли папка "frames", если нет, создаём её.
            if (!fs.existsSync(framesFolder)) {
                fs.mkdirSync(framesFolder);
            }

            frames.forEach((frame, index) => {
                try {
                    const frameFileName = `frame_${index + 1}.json`;
                    const frameData = JSON.stringify(frame);

                    fs.writeFileSync(path.resolve(framesFolder, frameFileName), frameData);
                } catch (error) {
                    console.error(`Error saving frame ${index + 1}:`, error);
                    throw new Error(`Error saving frame ${index + 1}`);
                }
            });
        } catch (error) {
            console.error('Error in saveFrames:', error);
            throw error;
        }
    }

}
export default new BackgroundService();
