import express, { Request, Response } from 'express';
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./typedefs";
import { dataSources } from "./data-sources";
import * as path from 'path';

const PORT = 4000;
// Initialize new Express app
const app = express();
app.use(express.static("public"));
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Set-up Apollo Server Express & attach to Express
const server = new ApolloServer({ typeDefs, resolvers, dataSources });
server.applyMiddleware({ app });

// Start Express Process listening on PORT
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
