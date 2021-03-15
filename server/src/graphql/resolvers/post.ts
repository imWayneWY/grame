import { PostQueryByIdProps } from '../../types';
import Post from './../../models/Post';

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(parent: any, args: PostQueryByIdProps, context: any, info: any) {
      const {postId} = args;
      try {
        const post = await Post.findById(postId);
        throw new Error("Post not found");
      } catch (err) {
        throw new Error(err)
      }
    },
  },
};
