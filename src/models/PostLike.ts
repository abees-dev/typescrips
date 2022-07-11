import { getModelForClass, Prop, Ref } from '@typegoose/typegoose'
// import { Post } from './Post'
import { User } from './User'

export interface IPostLike {
  userId: string
  postId: string
}

export class PostLikes {
  @Prop({ ref: () => User })
  userId: Ref<User>[]

  // @Prop({ ref: () => Post })
  // postId: Ref<Post>
  @Prop()
  postId: string
}

const PostLikeModel = getModelForClass(PostLikes)

export default PostLikeModel
