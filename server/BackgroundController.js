import BackgroundService from "./BackgroundService.js";
import fs from "fs";
import User from "./models/User.js";


class BackgroundController{
    async create(req, res){
        try{
            const background = await BackgroundService.create(req.body, req.user.id)
            res.status(200).json(background)
        } catch (e){
            res.status(e.status).json(e.message)
        }
    }
    // async getAll(req, res){
    //     try{
    //         const background = await BackgroundService.getAll()
    //         return res.status(200).json(background);
    //     } catch (e){
    //         const status = e.status || 500;
    //         const message = e.message || 'Internal Server Error';
    //         res.status(status).json(message);
    //     }
    // }
    async getBackground(req, res){
        try{
            const background = await BackgroundService.getBackground(req, res);
            return res.status(200).send(background)
        } catch (e){
            console.log(e)
            res.status(e.status).json(e.message)
        }
    }

    async update(req, res){
        try{
            const updatedBackground = await BackgroundService.update(req.body)
            return res.status(200).json(updatedBackground)
        } catch (e){
            res.status(e.status).json(e.message)
        }
    }

    async delete(req, res){
        try{
            const post = await BackgroundService.delete(req.params.name)
            return res.status(200).json(post)
        } catch (e){
            res.status(e.status).json(e.message)
        }
    }

    async saveAnimation(req, res) {
        // console.log(req.body)
        try{
            const post = await BackgroundService.saveAnimation(req.body)
            return res.status(200).json(post)

        } catch (e){
            res.status(e.status).json(e.message)
        }

    }


    async getFiles(req, res){
        try{
            const files = await BackgroundService.getFiles(req)
            return res.status(200).json(files)
        } catch (e){
            res.status(e.status).json(e.message)
        }

    }
    async registrationUser(req, res){
        try{
            const newUser = await BackgroundService.registrationUser(req, res)
            return res.status(200).json(newUser)
        } catch(e){
            // res.status(e.status).json(e.message)
            // res.send({message:"Server error"})
        }
    }
    async authUser(req, res){
        try{
            const newUser = await BackgroundService.authUser(req, res)
            return res.status(200).json(newUser)
        } catch(e){
            // res.status(e.status).json(e.message)
            // res.send({message:"Server error"})
        }
    }
	async authMiddleware(req, res){
		try {
			const newToken = await BackgroundService.authMiddleware(req, res)
			return res.status(200).json(newToken)
		} catch (e) {
			
		}
	}

}
export default new BackgroundController()