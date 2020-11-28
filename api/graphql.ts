// Create a new API endpoint handler in the appropriate directory for your project:
// Vercel: ./api/<endpoint-name>.{js|ts}
// Nextjs: ./pages/api/<endpoint-name>.{js|ts} or ./src/pages/api/<endpoint-name>.{js|ts}

import { ApolloServer } from "@saeris/apollo-server-vercel";
import {typeDefs} from '../utilities/merge-schema';
import {resolvers} from '../utilities/merge-resolvers';
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export default server.createHandler();
