import argon2 from 'argon2'
import RefreshTokenModel from '../models/RefreshToken'
import UserModel, { IUser } from '../models/User'
import {
	ParamMissingError,
	UnauthorizedError,
	UserConflictError,
} from '../shared/errors'

export const regiser = async (user: IUser) => {
	const { email, password } = user

	if (!email || !password) {
		throw new ParamMissingError()
	}

	const existingUser = await UserModel.findOne({ email })
	if (existingUser) {
		throw new UserConflictError()
	}

	const passwordHash = await argon2.hash(password)

	const newUser = new UserModel({
		email,
		password: passwordHash,
	})
	await newUser.save()

	return newUser
}

export const login = async (user: IUser) => {
	const { email, password } = user
	const existingUser = await UserModel.findOne({ email })

	if (!email || !password) {
		throw new ParamMissingError()
	}

	if (!existingUser) {
		throw new UnauthorizedError('Incorrect email or password')
	}

	const isValidPassword = await argon2.verify(existingUser.password, password)

	if (!isValidPassword) {
		throw new UnauthorizedError('Incorrect email or password')
	}

	return existingUser
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
