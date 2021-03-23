import {gql} from 'apollo-server';

// Notice: login and register use different way to pass params

export default gql`
  type UserInfo {
    email: String!
    username: String!,
    createdAt: String!,
  }
  type Comment {
    id: ID!,
    body: String!,
    username: String!,
    createdAt: String!,
  }
  type Like {
    id: ID!,
    username: String!,
    createdAt: String!,
  }
  type Post {
    id: ID!,
    body: String!,
    createdAt: String!,
    username: String!,
    user: UserInfo!,
    comments: [Comment]!,
    likes: [Like]!,
  }
  extend type Query {
    getPosts: [Post],
    getPost(postId: ID!): Post!,
  }
  extend type Mutation {
    createPost(body: String!): Post!,
    deletePost(postId: String!): Result!,
    createComment(postId: String!, body: String!): Post!,
    deleteComment(postId: String!, commentId: String!): Result!,
    toggleLike(postId: String!): Post!,
  }
`;
