import jwt, { Secret } from 'jsonwebtoken'

export const generateAccessToken = (user: any) => {
	return jwt.sign(
		{ userId: user._id },
		process.env.ACCESS_TOKEN_SECRET as Secret,
		{
			expiresIn: '10m',
		}
	)
}

export const generateRefreshToken = (user: any) => {
	return jwt.sign(
		{ userId: user._id },
		process.env.REFRESH_TOKEN_SECRET as Secret,
		{
			expiresIn: '350d',
		}
	)
}
