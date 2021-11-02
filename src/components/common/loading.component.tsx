import React, { FunctionComponent } from "react";
import { Emoji } from "../utilities/emoji.component";

export const LoadingComponent: FunctionComponent = () => (
  <div className="block align-middle text-center">
    <Emoji
      name="rocket"
      aria-label="loading"
      className="animate-pulse text-9xl"
    />
  </div>
);
