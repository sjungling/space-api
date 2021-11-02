import React, { FunctionComponent } from "react";
import Link from "next/link";
import { HOME_PAGE_LINK } from "../../constants/routes";
export const HeaderComponent: FunctionComponent = () => (
  <header>
    <h1>
      <Link href={HOME_PAGE_LINK}>SpaceAPI</Link>
    </h1>
  </header>
);
