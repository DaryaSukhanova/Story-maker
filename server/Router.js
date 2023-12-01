import Router from 'express'
import BackgroundController from "./BackgroundController.js";

const router = new Router()

router.post('/backgrounds', BackgroundController.create)
router.get('/backgrounds', BackgroundController.getAll)
router.get('/backgrounds/:name', BackgroundController.getOne)
router.put('/backgrounds', BackgroundController.update)
router.delete('/backgrounds/:name', BackgroundController.delete)
router.post('/frames', BackgroundController.saveFrames);

export default router;