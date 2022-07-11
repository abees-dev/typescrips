import jwt, { Secret } from 'jsonwebtoken'

export const generateAccessToken = (user: any): string => {
  const role: string = user.role.name.toLowerCase() as string
  return jwt.sign({ sub: user._id, role }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '10m',
  })
}

export const generateRefreshToken = (user: any): string => {
  const role: string = user.role.name.toLowerCase() as string
  return jwt.sign({ sub: user._id, role }, process.env.REFRESH_TOKEN_SECRET as Secret, {
    expiresIn: '350d',
  })
}
