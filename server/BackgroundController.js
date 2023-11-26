import BackgroundService from "./BackgroundService.js";

class BackgroundController{
    async create(req, res){
        try{
            const background = await BackgroundService.create(req.body)
            res.status(200).json(background)
        } catch (e){
            res.status(e.status).json(e.message)
        }
    }
    async getAll(req, res){
        try{
            const background = await BackgroundService.getAll()
            return res.status(200).json(background);
        } catch (e){
            res.status(e.status).json(e.message)
        }
    }
    async getOne(req, res, error){
        try{
            const background = await BackgroundService.getOne(req.params.name);
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

}
export default new BackgroundController()