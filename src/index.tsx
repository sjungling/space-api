import React, { FunctionComponent } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import "./styles.css";
import { createApolloClient } from "./apollo-client";
import { SpaceRouter } from "./routes";

const App: FunctionComponent<{ client: any }> = ({ client }) => (
  <>
    <ApolloProvider client={client}>
      <SpaceRouter />
    </ApolloProvider>
  </>
);

createApolloClient().then((client) => {
  render(<App client={client} />, document.getElementById("root"));
});
