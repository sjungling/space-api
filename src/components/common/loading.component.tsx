import React, { FunctionComponent } from "react";

export const LoadingComponent: FunctionComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="container animate-pulse w-1 h-1 text-9xl">🚀</div>
  </div>
);
