import argon2 from 'argon2'
import RefreshTokenModel from '../models/RefreshToken'
import UserModel, { IUser, User } from '../models/User'
import {
  ParamMissingError,
  UnauthorizedError,
  UserConflictError,
} from '../shared/errors'

// Regiser
export const regiser = async (user: IUser): Promise<User> => {
  const { email, password } = user

  if (!email || !password) {
    throw new ParamMissingError('Missing email or password')
  }

  const existingUser = await UserModel.findByEmail(email)

  if (existingUser) {
    throw new UserConflictError()
  }

  const passwordHash = await argon2.hash(password)

  const newUser: any = new UserModel({
    email,
    password: passwordHash,
  })
  await newUser.save()

  const { password: newPass, ...other } = newUser._doc
  return other
}

// Login
export const login = async (user: IUser): Promise<User> => {
  const { email, password } = user
  const existingUser: any = await UserModel.findByEmail(email)

  if (!email || !password) {
    throw new ParamMissingError('Missing email or password')
  }

  if (!existingUser) {
    throw new UnauthorizedError('Incorrect email or password')
  }

  const isValidPassword = await argon2.verify(existingUser.password, password)

  if (!isValidPassword) {
    throw new UnauthorizedError('Incorrect email or password')
  }

  const { password: newPass, ...other } = existingUser._doc
  return other
}

export const setToken = async (token: string, userId: string) => {
  const refreshToken = await RefreshTokenModel.findOne({ userId })
  if (!refreshToken) {
    const newFreshToken = new RefreshTokenModel({
      userId,
      refreshToken: token,
    })

    await newFreshToken.save()
  } else {
    await RefreshTokenModel.findOneAndUpdate(
      { userId },
      {
        refreshToken: token,
      }
    )
  }
}
