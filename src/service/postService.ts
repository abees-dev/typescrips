import { isValidObjectId, Types } from 'mongoose'
import PostModel, { IPost } from '../models/Post'
import { NotFoundError, ParamMissingError } from '../shared/errors'
import cloudinary from '../utils/cloudinary'

export const createPost = async (post: IPost, file: string | undefined) => {
  const { userId, content } = post

  const _id: Types.ObjectId = new Types.ObjectId()

  if (!userId || !content || !file) {
    throw new ParamMissingError('Missing the parameter (/ userId) or (/ content)')
  }

  const uploader = await cloudinary.uploader.upload(file, { overwrite: true, public_id: _id as unknown as string })

  const newPost = new PostModel({
    _id,
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

export const updatePost = async (id: string, data: IPost, file: string | undefined) => {
  if (!id || !isValidObjectId(id)) {
    throw new ParamMissingError('Missing the parameter (/ _id)')
  }

  const post = await PostModel.findById(id)

  const uploader: any =
    file && (await cloudinary.uploader.upload(file, { overwrite: true, public_id: id as unknown as string }))

  const dataUpdate = file
    ? {
        ...data,
        image: {
          url: uploader?.secure_url,
          public_id: uploader?.public_id,
        },
      }
    : data

  if (!post) {
    throw new NotFoundError('This post does not exist on the system')
  }

  const newPost = await PostModel.findByIdAndUpdate(id, dataUpdate, { new: true })

  return newPost
}

export const deletePost = async (id: string) => {
  if (!id || !isValidObjectId(id)) {
    throw new NotFoundError('This post does not exist on the system')
  }

  await PostModel.findByIdAndDelete(id)
}

export const getPostByUserID = async (userId: string) => {
  if (!userId) {
    throw new ParamMissingError('Missing the paramete (/ _id)')
  }
  // const post = await PostModel.aggregate([{ $match: { userId: new ObjectId(userId) } }]).lookup({
  //   from: 'postlikes',
  //   localField: 'likes',
  //   foreignField: '_id',
  //   as: 'postlikes',
  // })

  const post = await PostModel.find({ userId }).populate({
    path: 'likes',
    populate: { path: 'userId', select: '-password', populate: { path: 'info' } },
  })

  return post
}
