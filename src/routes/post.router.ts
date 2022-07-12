import { createPost, deletePost, getPostByUserID, updatePost } from '../service/postService'
import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer, { diskStorage } from 'multer'
import PostLikeModel from '../models/PostLike'
import PostModel from '../models/Post'

const router = Router()
const upload = multer({ storage: diskStorage({}) })

router.post('/create', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const body = req.body
    const file: string | undefined = req.file?.path

    const newPost = await createPost(body, file)

    return res
      .status(StatusCodes.CREATED)
      .json({ code: StatusCodes.CREATED, message: 'Create Post successfully', post: newPost })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.patch('/update/:id', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const file: string | undefined = req.file?.path
    const post = await updatePost(id, body, file)

    return res
      .status(StatusCodes.ACCEPTED)
      .json({ code: StatusCodes.ACCEPTED, message: 'Update post successfully', post })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.delete('/delete', async (req: Request, res: Response) => {
  try {
    const id: string = req.query.id as string
    await deletePost(id)

    return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, message: 'Delete post successfully' })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const posts = await getPostByUserID(id)
    return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, message: 'Get post by userid', posts })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.post('/likes', async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.body

    const newPostLike = new PostLikeModel({
      userId,
      postId,
    })

    await PostModel.findByIdAndUpdate(postId, {
      likes: newPostLike._id,
    })
    await newPostLike.save()

    return res.status(StatusCodes.CREATED).json({ code: StatusCodes.CREATED, postLike: newPostLike })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

export default router
