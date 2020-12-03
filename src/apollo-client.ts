import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
const batchHttpLink = new BatchHttpLink({ uri: "/api/graphql" });
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache,
  link: batchHttpLink,
  name: "space-api-web",
});
