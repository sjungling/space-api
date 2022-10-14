import { CssVarsProvider } from "@mui/joy/styles";
import { client } from "../apollo-client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { FooterComponent, HeaderComponent } from "../components/common";
import { Box, CssBaseline } from "@mui/joy";
import { spaceDevTheme } from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CssVarsProvider
        theme={spaceDevTheme}
        modeStorageKey="theme-pref"
        defaultMode="system"
      >
        <CssBaseline />
        <HeaderComponent />
        <Box component="main">
          <Component {...pageProps} />
        </Box>
        <FooterComponent />
      </CssVarsProvider>
    </ApolloProvider>
  );
}
export default MyApp;
