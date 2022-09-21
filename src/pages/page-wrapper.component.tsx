import React, { FunctionComponent } from "react";
import Head from "next/head";

export type PageWrapperProps = {
  title?: string;
  description?: string;
};
export const PageWrapper: FunctionComponent<
  React.PropsWithChildren<PageWrapperProps>
> = ({ title, description, children }) => {
  const BASE_TITLE = "SpaceAPI.dev";
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title ? `${title} - ${BASE_TITLE}` : BASE_TITLE}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </div>
  );
};
