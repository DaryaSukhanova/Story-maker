import express from "express"
const app = express()
import cors from "cors"
import router from './Router.js'
import mongoose from "mongoose";
import fileUpload from "express-fileupload"
const PORT = process.env.PORT || 5000
const DB_URL = `mongodb+srv://darya:admin@storymaker.x6axj9v.mongodb.net/?retryWrites=true&w=majority`
app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use('/api/v1', router)


async function startApp(){
    try{
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=> console.log('SERVER STARTED ON PORT '+ PORT))

    } catch (e){
        console.log(e)
    }
}

startApp()