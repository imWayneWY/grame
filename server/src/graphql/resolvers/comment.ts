import Post from '../../models/Post';
import { ContextProps, CreateCommentProps, DeleteCommentProps } from '../../types';
import {checkAuth} from './../../utils';
import errors from '../../errorCode';
import { UserInputError } from 'apollo-server-errors';

export default {
  Mutation: {
    async createComment(parent: any, args: CreateCommentProps, context: ContextProps, info: any) {
      const {postId, body} = args;
      const user = checkAuth(context.token);
      
      if (body.trim() === '') {
        throw new UserInputError(errors.COMMENT_BODY_EMPTY.message, errors.COMMENT_BODY_EMPTY);
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const res = await post.save();
        return res;
      } else {
        throw new UserInputError(errors.COMMENT_POST_NOT_EXISTED.message, errors.COMMENT_POST_NOT_EXISTED);
      }
    },
    async deleteComment(parent: any, args: DeleteCommentProps, context: ContextProps, info: any) {
      const {postId, commentId} = args;
      const user = checkAuth(context.token);
      
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);
        console.log("delete comment =====> ",commentIndex);
        if (user.username === post.comments[commentIndex].username) {
          post.comments.splice(commentIndex, 1);
          const res = await post.save();
          return res;
        } else {
          throw new UserInputError(errors.COMMENT_UNAUTH_DELETE.message, errors.COMMENT_UNAUTH_DELETE);
        }
      } else {
        throw new UserInputError(errors.COMMENT_POST_NOT_EXISTED.message, errors.COMMENT_POST_NOT_EXISTED);
      }
    },
    async toggleLike(parent: any, args: {postId: string}, context: ContextProps, info: any) {
      const {postId} = args;
      const user = checkAuth(context.token);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(l => l.username === user.username)) {
          post.likes = post.likes.filter(l => l.username !== user.username);
        } else {
          post.likes.unshift({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        const res = await post.save();
        return res;
      } else {
        throw new UserInputError(errors.LIKE_POST_NOT_EXISTED.message, errors.LIKE_POST_NOT_EXISTED);
      }
    },
  }
}
