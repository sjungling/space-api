import { ApolloServer } from "@saeris/apollo-server-vercel";
import { typeDefs, resolvers } from "./merge-packages";
import { dataSources } from "./data-sources";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  playground: true,
  introspection: true,
});

export default server.createHandler();
