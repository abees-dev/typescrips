import { getModelForClass, Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface IUser {
	_id: { [x: string]: any }
	email: string
	password: string
	name: string
	_doc: { [x: string]: any; password: string }
}

class User extends TimeStamps {
	@Prop({ unique: true, required: true })
	email: string
	@Prop()
	password: string
	@Prop({ default: 'Name default' })
	name: string
	_doc: any
}

const UserModel = getModelForClass(User)

export default UserModel
