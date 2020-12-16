import React, { FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";
import { PageWrapper } from "./page-wrapper.component";

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
    </PageWrapper>
  );
};
export default AboutPage;
