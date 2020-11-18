import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MissionComponent } from "../components/missions";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <MissionComponent />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
