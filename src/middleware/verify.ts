import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import JWT, { JwtPayload, Secret } from 'jsonwebtoken'

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const BearerToken = req.headers.authorization
    const accessToken = BearerToken?.split(' ')[1]
    if (!accessToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ code: StatusCodes.UNAUTHORIZED, message: 'Your account is not authenticated' })
    }
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret, error => {
      if (error) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ code: StatusCodes.UNAUTHORIZED, message: 'Your token is not valid' })
      }

      return next()
    })
    return
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const BearerToken = req.headers.authorization
    const accessToken = BearerToken?.split(' ')[1]
    if (!accessToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ code: StatusCodes.UNAUTHORIZED, message: 'Your account is not authenticated' })
    }
    const payload = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload
    if (payload.role !== 'admin') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ code: StatusCodes.UNAUTHORIZED, message: 'You are not authorized to access this data' })
    }
    return next()
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.PROXY_AUTHENTICATION_REQUIRED).json({
          code: StatusCodes.PROXY_AUTHENTICATION_REQUIRED,
          message: error.message,
        })
  }
}
