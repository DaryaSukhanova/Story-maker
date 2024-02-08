import Background from "./Background.js";
import fs from "fs"
import path from "path"
import createError from 'http-errors'
import xml2js from 'xml2js'
import { DOMParser } from 'xmldom';

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
        fs.writeFileSync(path.resolve('files/backgrounds', `${background.backgroundName}.png`), data, 'base64')
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
            const picture = fs.readFileSync(path.resolve('files/backgrounds', file.backgroundName))
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
                const picture = fs.readFileSync(path.resolve('files/backgrounds', file.backgroundName))
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
        fs.unlink(path.resolve('files/backgrounds', background.backgroundName), (err)=>{console.log(err)})
        fs.writeFileSync(path.resolve('files/backgrounds', background.backgroundName), data, 'base64')
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
                fs.unlink(path.resolve('files/backgrounds', file.backgroundName), (err) => {
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

    async saveAnimation(json) {
        try {
            const svg = json.svg; // Получаем строку SVG из JSON
            console.log(json.svg)
            const filePath = `./files/animations/${json.name}.svg`;
            fs.writeFileSync(filePath, svg, 'utf-8');

        } catch (error) {
            console.error('Error:', error);
        }
    }
    async isFolder(path){
        console.log(fs.lstatSync(path).isDirectory())
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path)
    }
    async getFiles(req){
        const base = './files/'
        let path = ''
        if('path' in req.query){
            path = req.query.path
        }
        if(await this.isFolder(base + path)){
            console.log("is Folder")
            let files = fs.readdirSync(base+path).map(item =>{
                const isDir = fs.lstatSync(base+path+'/'+item).isDirectory()
                let size = 0
                if(!isDir){
                    size = fs.statSync(base+path+'/'+item)
                    console.log(size.size)
                }

                return{
                    name: item,
                    dir: isDir,
                    size: size.size ?? 0
                }
            })
            return ({
                path: path,
                result: true,
                files: files
            })
        }

        console.log("req fileManager", req.query)
    }

}
export default new BackgroundService();
