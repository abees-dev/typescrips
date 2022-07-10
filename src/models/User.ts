import {
  getModelForClass,
  Prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Role } from './Role'
import { IUserInfo, UserInfo } from './UserInfo'

export interface IUser {
  email: string
  password: string
  info?: IUserInfo
  role?: string
  avatar?: {
    url: string
    id: string
  }
}

interface Field {
  query: object
}

export class User extends TimeStamps {
  @Prop({ unique: true, required: true })
  public email: string
  @Prop()
  password: string

  @Prop({ ref: () => Role, type: () => String })
  role?: Ref<Role, string>

  @Prop({ ref: () => UserInfo })
  info?: Ref<UserInfo>

  public static async findByEmail(
    this: ReturnModelType<typeof User>,
    email: string
  ) {
    return this.findOne({ email }).exec()
  }

  public static async updateUserParameters(
    this: ReturnModelType<typeof User>,
    query: Field,
    data: IUser
  ) {
    return this.findOneAndUpdate(query, { data }, { new: true })
  }

  public static async getUserByIdPopulate(
    this: ReturnModelType<typeof User>,
    id: string
  ) {
    return this.findById(id)
      .populate({ path: 'info', select: '-userId' })
      .select('-password')
      .exec()
  }
}

const UserModel = getModelForClass(User)

export default UserModel
