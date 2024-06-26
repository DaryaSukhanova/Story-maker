import Router from 'express'
import BackgroundController from "./BackgroundController.js"
import {check, validationResult} from "express-validator"
import authMiddleware from './middleware/auth.middleware.js'
import FileService from './services/fileService.js'
import File from './models/File.js'
import fC from './controllers/fileController.js'
import animationController from './controllers/animationController.js'
import pageController from './controllers/pageController.js'

const router = new Router()
const fileController = new fC()

router.post('/backgrounds', authMiddleware, BackgroundController.create)
// router.get('/backgrounds', BackgroundController.getAll)
router.get('/backgrounds', authMiddleware, BackgroundController.getBackground)
router.put('/backgrounds', BackgroundController.update)
router.delete('/backgrounds/:name', BackgroundController.delete)
router.get('/fileManager', authMiddleware, BackgroundController.getFiles)
router.post('/registration',         [
    check('email', "Uncorrected email").isEmail(),
    check('password', "Password must be longer than 3 and shorter than 12").isLength({min:3, max:12})
],
    BackgroundController.registrationUser)
router.post('/login', BackgroundController.authUser)
router.get('/auth', authMiddleware, BackgroundController.authMiddleware)
router.post("/files", authMiddleware, fileController.createDir)
router.get("/files", authMiddleware, fileController.getFiles)
router.post("/files/upload", authMiddleware, fileController.uploadFile)
router.get("/files/download", authMiddleware, fileController.downloadFile)
router.delete("/files", authMiddleware, fileController.deleteFile)
router.post('/animations', authMiddleware, animationController.saveAnimation)
router.get("/animations", authMiddleware, animationController.getAnimation)
router.post("/pages", authMiddleware, pageController.savePage)
router.get("/pages", authMiddleware, pageController.getPage)
export default router;