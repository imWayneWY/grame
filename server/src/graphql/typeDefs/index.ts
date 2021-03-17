import { gql } from 'apollo-server-core';
import post from './post';
import user from './user';
// This root Mutation and Query only serve on purpose:
// to be extended on by the Queries and Mutations in 
// my other files. 
const root = gql`
  type Result {
    success: Boolean
    message: String
  }
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`
export default [root, post, user];
