import React, { FunctionComponent } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import "./styles.css";
import { apolloClient } from "./apollo-client";
import { SpaceRouter } from "./routes";

const App: FunctionComponent = () => (
  <>
    <ApolloProvider client={apolloClient}>
      <SpaceRouter />
    </ApolloProvider>
  </>
);

render(<App />, document.getElementById("root"));
