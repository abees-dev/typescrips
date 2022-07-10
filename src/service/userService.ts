import UserModel from '../models/User'
import UserInfoModel, { IUserInfo } from '../models/UserInfo'
import { ParamMissingError } from '../shared/errors'
export const createAndUpdate = async (userInfo: IUserInfo) => {
  const { userId, firstName, lastName, phoneNumber, gender, address } = userInfo
  if (!userId) {
    throw new ParamMissingError('Missing the parameter')
  }
  const existingUser = await UserModel.findById(userId)

  if (existingUser) {
    const newUserInfo = await UserInfoModel.findOneAndUpdate(
      { userId: existingUser._id },
      {
        userId,
        firstName,
        lastName,
        phoneNumber,
        gender,
        address,
      },
      { new: true }
    )
    return newUserInfo
  }
  const newUserInfo = new UserInfoModel({
    userId,
    firstName,
    lastName,
    phoneNumber,
    gender,
    address,
  })

  await newUserInfo.save()

  const userUpdate = await UserModel.findByIdAndUpdate(userId, {
    info: newUserInfo._id,
  })
  console.log(userUpdate)
  return newUserInfo
}
