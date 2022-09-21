import React, { FunctionComponent } from "react";
import Head from "next/head";
import { Container } from "@mui/joy";

export type PageWrapperProps = {
  title?: string | null;
  description?: string;
};
export const PageWrapper: FunctionComponent<
  React.PropsWithChildren<PageWrapperProps>
> = ({ title, description, children }) => {
  const BASE_TITLE = "SpaceAPI.dev";
  return (
    <Container>
      <Head>
        <title>{title ? `${title} - ${BASE_TITLE}` : BASE_TITLE}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </Container>
  );
};
