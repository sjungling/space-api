import React, { FunctionComponent } from "react";
import Markdown from "markdown-to-jsx";
import AboutContent from "./about.md";

const AboutPage: FunctionComponent = () => {
  return (
    <div>
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
    </div>
  );
};
export default AboutPage;
