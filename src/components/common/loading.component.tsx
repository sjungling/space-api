import React, { FunctionComponent } from "react";

export const LoadingComponent: FunctionComponent = () => (
  <div className="block align-middle text-center">
    <span
      role="img"
      aria-label="loading"
      className="container animate-pulse w-1 h-1 text-9xl"
    >
      🚀
    </span>
  </div>
);
