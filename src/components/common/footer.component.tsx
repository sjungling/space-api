import { List, ListItem, Typography } from "@mui/joy";
import React, { FunctionComponent } from "react";
import { ABOUT_PAGE_LINK } from "../../constants/routes";
import { FlexBox } from "../utilities/styled.components";
import { Link } from "./link.component";

export const FooterComponent: FunctionComponent = () => (
  <FlexBox
    component="footer"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <FlexBox component="nav">
      <List role="menubar" row>
        <ListItem className="inline mr-4">
          <Link href={ABOUT_PAGE_LINK}>About</Link>
        </ListItem>
        <ListItem className="inline mr-4">
          <Link external href="https://github.com/sjungling/space-api">
            GitHub
          </Link>
        </ListItem>
      </List>
    </FlexBox>
    <Typography>Made in California</Typography>
  </FlexBox>
);
