import {model, Schema} from 'mongoose';

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comment: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // user lower case and it will automatically find Users 
  }
});

export default model('Post', postSchema);
