import { ApolloServer, ServerInfo } from 'apollo-server';
import { typeDefs, resolvers } from './typedefs';
import { dataSources } from './data-sources';

const server = new ApolloServer( { typeDefs, resolvers, dataSources});

const onServerListen = ({ url }:ServerInfo) => {
  console.log(`🚀  Server ready at ${url}`);
}
server.listen().then(onServerListen);