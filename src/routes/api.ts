import { Router } from 'express'
import authRouter from './auth.router'
import userRouter from './user.router'
import roleRouter from './role.router'
import postRouter from './post.router'

const apiRouter = Router()

// Auth
apiRouter.use('/auth', authRouter)
// User
apiRouter.use('/users', userRouter)
// Roles
apiRouter.use('/roles', roleRouter)
// Post
apiRouter.use('/post', postRouter)

export default apiRouter
