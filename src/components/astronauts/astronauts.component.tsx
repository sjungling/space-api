import React, { FunctionComponent } from "react";

import { Chip, ListItem, Typography } from "@mui/joy";

import { CREATE_ASTRONAUT_DETAIL_LINK } from "../../constants/routes";
import { AstronautDetailsFragment } from "../../generated/apollo-hooks";
import { Link } from "../common/link.component";
import { Emoji } from "../utilities/emoji.component";

export const AstronautCardComponent: FunctionComponent<{
  astronaut: AstronautDetailsFragment;
}> = ({ astronaut: { id, firstName, lastName } }) => {
  return (
    <ListItem key={id}>
      <Chip
        component="span"
        variant="outlined"
        startDecorator={<Emoji name="astronaut" />}
        componentsProps={{
          action: { component: Link, href: CREATE_ASTRONAUT_DETAIL_LINK(id) },
        }}
      >
        {firstName} {lastName}
      </Chip>
    </ListItem>
  );
};

export const AstronautDetail: FunctionComponent<{
  astronaut: AstronautDetailsFragment;
}> = ({ astronaut: { firstName, lastName } }) => (
  <Typography component="h1">
    {firstName} {lastName}
  </Typography>
);
