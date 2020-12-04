import React, { FunctionComponent } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import "./styles.css";
import { apolloClient } from "./apollo-client";
import { SpaceRouter } from "./routes";

const App: FunctionComponent = () => (
  <>
    <header>
      <h1>SpaceAPI</h1>
    </header>
    <main>
      <ApolloProvider client={apolloClient}>
        <SpaceRouter />
      </ApolloProvider>
    </main>
    <footer>Made in California</footer>
  </>
);

render(<App />, document.getElementById("root"));
