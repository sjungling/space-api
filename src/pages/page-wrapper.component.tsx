import React, { FunctionComponent } from "react";
import useMetaTags from "react-metatags-hook";

export type PageWrapperProps = {
  title?: string;
  description?: string;
};
export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  title,
  description,
  children,
}) => {
  const BASE_TITLE = "SpaceAPI.dev";
  useMetaTags({
    title: title ? `${title} - ${BASE_TITLE}` : BASE_TITLE,
    description,
  });
  return <div>{children}</div>;
};
