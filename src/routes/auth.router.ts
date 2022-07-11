import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import UserModel from '../models/User'
import { login, regiser, setToken } from '../service/authService'
import { generateAccessToken } from '../utils/authentication'
import { generateRefreshToken } from './../utils/authentication'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const body = req.body
    const user = await regiser(body)

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      message: 'Register successful',
      user,
    })
  } catch (error) {
    return res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = req.body
    const user: any = await login(body)

    const accessToken = generateAccessToken(user)

    const refreshToken = generateRefreshToken(user)

    setToken(refreshToken, user._id)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Login successfully',
      user,
      accessToken,
    })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: 'You are not authenticated',
      })
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as JwtPayload
    const existingUser = await UserModel.findById(payload.userId)
    if (!existingUser)
      return res.status(StatusCodes.NOT_FOUND).json({ code: StatusCodes.NOT_FOUND, message: 'User Not Found' })
    const newRefreshToken = generateRefreshToken(existingUser)
    const newAccessToken = generateAccessToken(existingUser)
    setToken(newRefreshToken, payload.userId)

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Refresh token',
      accessToken: newAccessToken,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    })
  }
})

export default router
