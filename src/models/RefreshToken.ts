import { getModelForClass, Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface IRefreshToken {
	userId: string
	refreshToken: string
}

class RefreshToken extends TimeStamps {
	@Prop()
	userId: string
	@Prop()
	refreshToken: string
}

const RefreshTokenModel = getModelForClass(RefreshToken)

export default RefreshTokenModel
