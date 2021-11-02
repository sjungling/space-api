import React, { FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";
import { PageWrapper } from "./page-wrapper.component";
import Script from "next/script";

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
  // useEffect(() => {
  //   if (window && document) {
  //     const script = document.createElement("script");
  //     const body = document.getElementsByTagName("body")[0];
  //     script.src = "";
  //     body.appendChild(script);
  //     script.addEventListener("load", () => {
  //       if (window.EmbeddedExplore) {

  //       }
  //     });
  //   }
  // }, []);
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
              document: DEFAULT_QUERY,
              variables: DEFAULT_VARIABLES,
            },
          });
        }}
      />
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
