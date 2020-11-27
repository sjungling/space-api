import { ApolloServer } from "apollo-server";
import { Config as apolloServerConfig } from "apollo-server-express";
import { resolvers } from "./utilities/merge-resolvers";
import { typeDefs } from "./utilities/merge-schema";
import { dataSources } from "./data-sources";

export const initializeServer = (): void => {
  const PORT = process.env.PORT || 4000;

  // Set-up Apollo Server Express
  const apolloServerConfig: apolloServerConfig = {
    typeDefs,
    resolvers,
    dataSources,
    stopOnTerminationSignals: true,
  };
  const server = new ApolloServer(apolloServerConfig);

  // Start Express Process listening on PORT
  server.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

initializeServer();
