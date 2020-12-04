import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const apolloClient = new ApolloClient({
  name: "space-api-web",
  cache: new InMemoryCache(),
  uri: process.env.GRAPHQL_URI || "/api/graphql",
});
