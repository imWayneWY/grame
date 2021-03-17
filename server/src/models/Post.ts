import mongoose, {model, Schema} from 'mongoose';
interface CommentProps{
  id?: string,
  body: string,
  username: string,
  createdAt: string,
}
interface LikePorps{
  id?: string,
  username: string,
  createdAt: string,
}
export interface PostDoc extends mongoose.Document {
  body: string,
  username: string,
  createAt: string,
  user: string,
  comments: CommentProps[],
  likes: LikePorps[],
}
const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // user lower case and it will automatically find Users 
  }
});

export default model<PostDoc>('Post', postSchema);
