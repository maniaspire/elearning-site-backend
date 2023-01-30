import { Router } from 'express'
import Token from '../middleware/verifyToken.js'
import QaController from '../controllers/qa-controller.js'
import { sendResponse, use } from '../service/response.js'
const router = Router()

const qaController = new QaController()
const tokenService = new Token()

router.get('/api/ping', use(async (request, response) => {sendResponse(response, {statusCode: 200, message: 'server running'})}))

router.post('/api/upload-question',
    [tokenService.verifyToken], use(qaController.uploadQuestion))
router.get('/api/my-questions/:id',
    [tokenService.verifyToken], use(qaController.getMyQuestions))
router.get('/api/all-questions',
    [tokenService.verifyToken, tokenService.isProfessor], use(qaController.getAllQuestions))
router.get('/api/answered-question/:id',
    [tokenService.verifyToken, tokenService.isProfessor], use(qaController.getDataForEdit))

router.put('/api/answer',
    [tokenService.verifyToken], use(qaController.submitAnswer))

export default router