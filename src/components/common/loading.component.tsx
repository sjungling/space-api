import { CircularProgress } from "@mui/joy";
import React, { FunctionComponent } from "react";
import { Emoji } from "../utilities/emoji.component";

export const LoadingComponent: FunctionComponent = () => (
  <CircularProgress>
    <Emoji name="rocket" aria-label="loading" />
  </CircularProgress>
);
