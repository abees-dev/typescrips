import { ParamMissingError } from './../shared/errors'
import PostModel, { IPost } from '../models/Post'
import cloudinary from '../utils/cloudinary'
import { mongoose } from '@typegoose/typegoose'

export const createPost = async (post: IPost, file: string | undefined) => {
  const { userId, content } = post

  if (!userId || !content || !file) {
    throw new ParamMissingError('Missing the parameter (/ userId) or (/ content)')
  }

  const uploader = await cloudinary.uploader.upload(file)

  const newPost = new PostModel({
    userId,
    content,
    image: {
      url: uploader.secure_url,
      public_id: uploader.public_id,
    },
  })
  await newPost.save()
  return newPost
}

export const getPostByUserID = async (userId: string) => {
  if (!userId) {
    throw new ParamMissingError('Missing the paramete (/ _id)')
  }

  const ObjectId = mongoose.Types.ObjectId

  const post = await PostModel.aggregate([{ $match: { userId: new ObjectId(userId) } }]).lookup({
    from: 'postlikes',
    localField: 'likes',
    foreignField: '_id',
    as: 'postlikes',
  })

  // const post = await PostModel.find({ userId }).populate({ path: 'likes' })

  return post
}
