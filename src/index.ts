import Bundler from "parcel-bundler";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./typedefs";
import { dataSources } from "./data-sources";
import { join } from "path";

export const initializeServer = (): void => {
  const PORT = 4000;
  // Initialize new Express app
  const app = express();

  const file = join(__dirname, "index.html"); // Pass an absolute path to the entrypoint here
  const options = {}; // See options section of api docs, for the possibilities

  // Initialize a new bundler using a file and options
  const bundler = new Bundler(file, options);

  // Set-up Apollo Server Express & attach to Express
  const server = new ApolloServer({ typeDefs, resolvers, dataSources });
  server.applyMiddleware({ app });

  app.use("/", bundler.middleware());
  // Start Express Process listening on PORT
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

initializeServer();
