import { getModelForClass, Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface IUserInfo {
  userId: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: Gender
  dateOfBirth: Date
  address: string
}

enum Gender {
  male = 'male',
  female = 'female',
}

export class UserInfo extends TimeStamps {
  @Prop({ unique: true, required: true })
  userId: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  phoneNumber: string

  @Prop({ enum: Gender })
  gender: Gender

  @Prop()
  dateOfBirth: Date

  @Prop()
  address: string
}

const UserInfoModel = getModelForClass(UserInfo)

export default UserInfoModel
