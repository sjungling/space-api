import React, { FunctionComponent } from "react";
import Link from "next/link";
import { ABOUT_PAGE_LINK } from "../../constants/routes";

export const FooterComponent: FunctionComponent = () => (
  <footer>
    <nav>
      <ul>
        <li className="inline mr-4">
          <Link href={ABOUT_PAGE_LINK}>About</Link>
        </li>
        <li className="inline mr-4">
          <a href="https://github.com/sjungling/space-api">GitHub</a>
        </li>
      </ul>
    </nav>
    <div>Made in California</div>
  </footer>
);
