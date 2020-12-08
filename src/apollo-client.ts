import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { isDevelopment } from "./utilities";

declare let GRAPHQL_URI: string;

const link = new HttpLink({
  uri: GRAPHQL_URI,
  useGETForQueries: !isDevelopment(),
});
const cache = new InMemoryCache();

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
