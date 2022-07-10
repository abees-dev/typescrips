import { Prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from './User'

export interface IFriend {
  userId: String
}

export class Friend extends TimeStamps {
  @Prop({ ref: () => User, type: () => String })
  userId: Ref<User, string>
}
