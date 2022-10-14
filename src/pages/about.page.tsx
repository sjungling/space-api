import React, { FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";
import { PageWrapper } from "../components/utilities/page-wrapper.component";
import Script from "next/script";
import { Link } from "../components/common/link.component";
import { Box, List, ListItem, Typography, useColorScheme } from "@mui/joy";

const DEFAULT_QUERY = `
query ($missionId: Int!) {
  mission(id: $missionId) {
    ... on Mission {
      id
      mission
      astronauts {
        id
        firstName
        lastName
      }
    }
  }
}
`;
const DEFAULT_VARIABLES = {
  missionId: 3,
};

const AboutPage: FunctionComponent = () => {
  const { mode } = useColorScheme();
  return (
    <PageWrapper title="About this project">
      <Script
        id="explorer"
        src="https://embeddable-explorer.cdn.apollographql.com/_latest/embeddable-explorer.umd.production.min.js"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          new EmbeddedExplorer({
            target: "#embedded-explorer",
            graphRef: "SpaceAPI-o3aoab@current",
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            endpointUrl: `${process.env.NEXT_PUBLIC_GRAPHQL_URI}`,
            initialState: {
              displayOptions: {
                theme: mode,
                docsPanelState: false,
              },
              document: DEFAULT_QUERY,
              variables: DEFAULT_VARIABLES,
            },
          });
        }}
      />
      <Markdown
        options={{
          overrides: {
            ul: {
              component: List,
            },
            li: {
              component: ListItem,
            },
            p: {
              component: Typography,
            },
            h1: {
              component: Typography,
              props: {
                component: "h1",
                textAlign: "center",
              },
            },
            h2: {
              component: Typography,
              props: {
                component: "h2",
              },
            },
            a: {
              component: Link,
              props: {
                external: true,
              },
            },
          },
        }}
      >
        {AboutContent}
      </Markdown>

      <Box
        sx={{
          height: "80vh",
          minHeight: "60vh",
        }}
        id="embedded-explorer"
      />
    </PageWrapper>
  );
};
export default AboutPage;
