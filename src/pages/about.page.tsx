import React, { FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";
import { PageWrapper } from "./page-wrapper.component";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.min.css";

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
const DEFAULT_VARIABLES = `{
  "missionId": 3
}
`;
const AboutPage: FunctionComponent = () => {
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
        className="w-11/12 p-0 m-0"
        style={{
          minHeight: "50vh",
          height: "50vh",
        }}
      >
        <GraphiQL
          defaultQuery={DEFAULT_QUERY}
          variables={DEFAULT_VARIABLES}
          defaultVariableEditorOpen={true}
          docExplorerOpen={true}
          fetcher={async (graphQLParams) => {
            const data = await fetch("https://graph.spaceapi.dev/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(graphQLParams),
              credentials: "same-origin",
            });
            return data.json().catch(() => data.text());
          }}
        />
      </div>
    </PageWrapper>
  );
};
export default AboutPage;
