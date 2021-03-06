import User from '../../models/User';
import { ContextProps, CreatePostProps, PostQueryByIdProps } from '../../types';
import Post from './../../models/Post';
import {checkAuth} from './../../utils';

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
        const post = await Post.findById(postId).sort({ createdAt: -1 });
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    async createPost(parent: any, args: CreatePostProps, context: ContextProps, info: any) {
      const user = checkAuth(context.token);
      const {body} = args;
      const newPost = new Post({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
        user: user.id,
      });
      const res = await newPost.save();
      return res;
    },
    async deletePost(parent: any, args: PostQueryByIdProps, context: ContextProps, info: any) {
      const user = checkAuth(context.token);
      const { postId } = args;
      try {
        const post = await Post.findById(postId);
        // !typeof post.user is object
        if (!!post && post.user.toString() === user.id) {
          const res = await post.delete();
          if (!!res) {
            return {success: true, message: 'Delete success'};
          } 
        } 
      } catch(err) {
        throw new Error(err);
      }
      return {success: false, message: 'Delete fail'};
    }
  },
  Post: {
    async user(parent: any) {
      console.log(parent);
      const res = await User.findById(parent.user);
      return res;
    }
  }
};
