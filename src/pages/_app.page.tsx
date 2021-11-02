import "../styles.css";
import { client } from "../apollo-client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { FooterComponent, HeaderComponent } from "../components/common";

// export default App;
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <HeaderComponent />
      <main>
        <Component {...pageProps} />
      </main>
      <FooterComponent />
    </ApolloProvider>
  );
}
export default MyApp;
