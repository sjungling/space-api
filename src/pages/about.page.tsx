import React, { useEffect, FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";
import { PageWrapper } from "./page-wrapper.component";

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
declare const window: never;
const AboutPage: FunctionComponent = () => {
  useEffect(() => {
    if (window && document) {
      const script = document.createElement("script");
      const body = document.getElementsByTagName("body")[0];
      script.src =
        "https://embeddable-explorer.cdn.apollographql.com/_latest/embeddable-explorer.umd.production.min.js";
      body.appendChild(script);
      script.addEventListener("load", () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        new window.EmbeddedExplorer({
          target: "#embedded-explorer",
          graphRef: "SpaceAPI-o3aoab@current",
          endpointUrl: "https://obscure-falls-20397.herokuapp.com/",
          initialState: {
            document: DEFAULT_QUERY,
            variables: DEFAULT_VARIABLES,
          },
        });
      });
    }
  }, []);
  return (
    <PageWrapper title="About this project">
      <Markdown
        options={{
          overrides: {
            li: {
              props: {
                className: "list-disc list-inside",
              },
            },
            h1: {
              props: {
                className: "center",
              },
            },
            h2: {
              props: {
                className: "mt-2",
              },
            },
          },
        }}
      >
        {AboutContent}
      </Markdown>

      <div
        className="w-8/12 p-0 m-0 "
        style={{
          position: "relative",
          minHeight: "50vh",
          width: "90vw",
          height: "60vh",
        }}
        id="embedded-explorer"
      ></div>
    </PageWrapper>
  );
};
export default AboutPage;
