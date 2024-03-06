import Background from "./models/Background.js";
import User from "./models/User.js";
import fs from "fs"
import path from "path"
import createError from 'http-errors'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check, validationResult} from "express-validator"
import FS from "./services/fileService.js";
import File from "./models/File.js";

const secretKey = "mern-secret-key"
const FileService = new FS()
class BackgroundService{7
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

    async registrationUser(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Uncorrect reques", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
			await FileService.createDir(new File({user: user.id, name: ""}))
            return res.json({message:"User was created"})
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async authUser(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if(!isPassValid){
                return res.status(400).json({message:"Invalid password"})
            }
            const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
            return res.json({
                token,
                user:{
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar:user.avatar
                }
            })
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({message: "Server error"});
        }
    }

	async authMiddleware(req, res){
		try {
			const user = await User.findOne({_id: req.user.id})
			const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
            return res.json({
                token,
                user:{
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar:user.avatar
                }
            })
		} catch (e) {
			console.log(e)
			res.send({message: "Server error"})
		}
	}

}
export default new BackgroundService();
