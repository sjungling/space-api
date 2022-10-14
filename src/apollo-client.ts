import { ApolloClient, InMemoryCache } from "@apollo/client";

import generatedIntrospection from "./generated/apollo-client-fragment";
import { isDevelopment } from "./utilities";

const cache = new InMemoryCache({
  possibleTypes: generatedIntrospection.possibleTypes,
});

export const client = new ApolloClient({
  name: "space-api-web",
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache,
  connectToDevTools: isDevelopment(),
  assumeImmutableResults: true,
});
