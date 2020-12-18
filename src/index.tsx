import React, { FunctionComponent } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import "./styles.css";
import { createApolloClient } from "./apollo-client";
import { SpaceRouter } from "./routes";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

const App: FunctionComponent<{
  client: ApolloClient<NormalizedCacheObject>;
}> = ({ client }) => (
  <>
    <ApolloProvider client={client}>
      <SpaceRouter />
    </ApolloProvider>
  </>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
createApolloClient()
  .then((client) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    render(<App client={client} />, document.getElementById("root"));
  })
  .catch((e) => console.error(e));
