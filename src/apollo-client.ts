import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { isDevelopment } from "./utilities";

const GRAPHQL_URI = process.env.GRAPHQL_URI || "/api/graphql";
const link = new HttpLink({ uri: GRAPHQL_URI, useGETForQueries: true });
const cache = new InMemoryCache();

export const createApolloClient = async () => {
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
