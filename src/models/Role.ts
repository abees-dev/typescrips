import { getModelForClass, Prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface IRole {
  // _id: { [x: string]: any }
  name: string
}

export class Role extends TimeStamps {
  @Prop({ required: true, unique: true })
  public name: string
}

const RoleModel = getModelForClass(Role)

export default RoleModel
