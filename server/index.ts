import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'hello world',
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5001}).then(res => {
  console.log(`Server running at ${res.url}`);
});
