import { Router } from 'express'
import RegisterController from '../controllers/register-controller.js'
import { use } from '../service/response.js'

const router = Router()

const registerController = new RegisterController()

router.post('/api/register', use(registerController.register))

export default router