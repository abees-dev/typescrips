import { Router } from 'express'
import authRouter from './auth.router'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)

export default apiRouter
