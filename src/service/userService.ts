import { IObjectWithTypegooseFunction } from '@typegoose/typegoose/lib/types'
import { isString } from 'lodash'
import { isValidObjectId, Types } from 'mongoose'
import UserModel from '../models/User'
import UserInfoModel, { IUserInfo, UserInfo } from '../models/UserInfo'
import { ParamMissingError, UnauthorizedError, NotFoundError } from '../shared/errors'
import cloudinary from '../utils/cloudinary'

type ReturnModelType = UserInfo &
  IObjectWithTypegooseFunction & {
    _id: Types.ObjectId
  }

export const createAndUpdate = async (userInfo: IUserInfo, file?: any): Promise<ReturnModelType> => {
  const { userId } = userInfo

  if (!userId) {
    throw new ParamMissingError('Missing the parameter')
  }

  if (!isValidObjectId(userId)) {
    throw new NotFoundError('This account does not exist on the system')
  }

  const existingUser = await UserModel.findById(userId)

  if (!existingUser) {
    throw new UnauthorizedError('User is not authenticated')
  }

  const existingUserInfo = await UserInfoModel.findOne({ userId })

  const uploader: any =
    isString(file) &&
    file &&
    (await cloudinary.uploader.upload(file, {
      overwrite: true,
      public_id: userId,
    }))

  const update: IUserInfo = uploader
    ? {
        ...userInfo,
        avatar: {
          url: uploader?.secure_url,
          public_id: uploader?.public_id,
        },
      }
    : userInfo

  if (existingUserInfo) {
    const userInfoUpdate: any = await UserInfoModel.findOneAndUpdate({ userId }, update, {
      new: true,
    })
    return userInfoUpdate
  }
  const newUserInfo = new UserInfoModel(update)

  await newUserInfo.save()

  await UserModel.findByIdAndUpdate(userId, {
    info: newUserInfo._id,
  })
  return newUserInfo
}
