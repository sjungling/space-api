import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { isDevelopment } from "./utilities";

declare let GRAPHQL_URI: string;

const link = ApolloLink.from([
  createHttpLink({ uri: GRAPHQL_URI, useGETForQueries: true }),
]);

const cache = new InMemoryCache({
  // addTypename: true,
});

export const createApolloClient = async (): Promise<
  ApolloClient<NormalizedCacheObject>
> => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    debug: isDevelopment(),
  });
  return new ApolloClient({
    name: "space-api-web",
    cache: cache,
    uri: GRAPHQL_URI,
    link,
    connectToDevTools: isDevelopment(),
  });
};
