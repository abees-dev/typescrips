import UserModel from '../models/User'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createAndUpdate } from '../service/userService'

const router = Router()

router.post('/create', async (req: Request, res: Response) => {
  try {
    const body = req.body
    const useInfo = await createAndUpdate(body)
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Update UserInfo successfully',
      data: useInfo,
    })
  } catch (error) {
    return error?.statusCode
      ? res
          .status(error.statusCode)
          .json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log('router.get :: id', id)
    const users = await UserModel.getUserByIdPopulate(id)
    return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, users })
  } catch (error) {
    return error?.statusCode
      ? res
          .status(error.statusCode)
          .json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

export default router
