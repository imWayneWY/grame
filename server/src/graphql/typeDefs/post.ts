import {gql} from 'apollo-server';

// Notice: login and register use different way to pass params

export default gql`
  type Post {
    id: ID!,
    body: String!,
    createdAt: String!,
    username: String!
    user: String!
  }
  extend type Query {
    getPosts: [Post],
    getPost(postId: ID!): Post!,
  }
  extend type Mutation {
    createPost(body: String!): Result!,
    deletePost(postId: String!): Result!,
  }
`;
