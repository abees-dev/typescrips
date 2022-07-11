import { PostLikes } from './PostLike'
import { getModelForClass, mongoose, Prop, Ref } from '@typegoose/typegoose'
import { User } from './User'

export interface IPost {
  image: {
    url: string
    public_id: string
  }
  content: string
  userId: string
  likeId: string
  commentId: String
}

export class Post {
  @Prop({ type: () => mongoose.Schema.Types.Map })
  image: {
    url: string
    public_id: string
  }

  @Prop()
  content: string

  @Prop({ ref: () => User })
  userId: Ref<User>

  @Prop({ ref: () => PostLikes })
  likes: Ref<PostLikes>

  @Prop()
  commentId: string
}

const PostModel = getModelForClass(Post)

export default PostModel
