import React, { FunctionComponent } from "react";

export const LoadingComponent: FunctionComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <span
      role="img"
      aria-label="loading"
      className="container animate-pulse w-1 h-1 text-9xl"
    >
      🚀
    </span>
  </div>
);
