import NextLink from "next/link";
import { FunctionComponent } from "react";

import { Link as JoyLink, LinkProps } from "@mui/joy";

export const Link: FunctionComponent<
  React.PropsWithChildren<{ external?: boolean } & LinkProps>
> = ({ children, href = "#", external, ...props }) => (
  <NextLink passHref href={href}>
    <JoyLink
      rel={external ? "noopener" : undefined}
      target={external ? "_blank" : undefined}
      {...props}
    >
      {children}
    </JoyLink>
  </NextLink>
);
