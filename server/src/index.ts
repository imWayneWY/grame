import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs"
import query from "./graphql/resolvers";

import { MONGODB_STR } from "./config";

const resolvers = {
  ...query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({token: req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : undefined}),
});

mongoose
  .connect(MONGODB_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conected!");
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
