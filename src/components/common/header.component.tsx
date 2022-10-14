import { Box, Typography } from "@mui/joy";
import React, { FunctionComponent } from "react";
import { HOME_PAGE_LINK } from "../../constants/routes";
import { ModeToggle } from "../utilities/mode-toggle.component";
import { Link } from "./link.component";

export const HeaderComponent: FunctionComponent = () => (
  <Box component="header" display="flex" justifyContent="space-between">
    <Typography component="h1">
      <Link href={HOME_PAGE_LINK}>SpaceAPI</Link>
    </Typography>
    <ModeToggle />
  </Box>
);
