import Router from 'express'
import BackgroundController from "./BackgroundController.js";
import {check, validationResult} from "express-validator"
import authMiddleware from './middleware/auth.middleware.js';

const router = new Router()

router.post('/backgrounds', BackgroundController.create)
router.get('/backgrounds', BackgroundController.getAll)
router.get('/backgrounds/:name', BackgroundController.getOne)
router.put('/backgrounds', BackgroundController.update)
router.delete('/backgrounds/:name', BackgroundController.delete)
router.post('/animations', BackgroundController.saveAnimation);
router.get('/fileManager', BackgroundController.getFiles)
router.post('/registration',         [
    check('email', "Uncorrected email").isEmail(),
    check('password', "Password must be longer than 3 and shorter than 12").isLength({min:3, max:12})
],
    BackgroundController.registrationUser)
router.post('/login', BackgroundController.authUser)
router.get('/auth', authMiddleware, BackgroundController.authMiddleware)
export default router;