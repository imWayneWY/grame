import {gql} from 'apollo-server';

// Notice: login and register use different way to pass params

export default gql`
  type User {
    email: String!
    username: String!,
    createdAt: String!,
    token: String!,
  }

  input RegisterInput {
    username: String!,
    email: String!,
    password: String!,
    confirmPassword: String!,
  }

  extend type Mutation {
    register(registerInput: RegisterInput): User!,
    login(username: String!, password: String!): User!,
  }
`;
