import { getModelForClass, mongoose, Prop, ReturnModelType } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface IUserInfo extends Document {
  userId: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: Gender
  dateOfBirth: Date
  address: string
  avatar: {
    url: string
    public_id: string
  }
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

  @Prop({ type: () => mongoose.Schema.Types.Map })
  avatar: {
    url: string
    public_id: string
  }

  @Prop()
  address: string
}

const UserInfoModel: ReturnModelType<typeof UserInfo> = getModelForClass(UserInfo)

export default UserInfoModel
