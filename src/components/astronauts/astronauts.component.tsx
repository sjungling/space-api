import React, { FunctionComponent } from "react";

import { Chip, ListItem, Typography } from "@mui/joy";

import { CREATE_ASTRONAUT_DETAIL_LINK } from "../../constants/routes";
import { Link } from "../common/link.component";
import { Emoji } from "../utilities/emoji.component";
import { FragmentType, useFragment } from "../../generated/gql";
import { AstronautDetailsFragmentDoc } from "../../generated/gql/graphql";

export const AstronautCardComponent: FunctionComponent<{
  astronaut: FragmentType<typeof AstronautDetailsFragmentDoc>;
}> = (props) => {
  const astronaut = useFragment(AstronautDetailsFragmentDoc, props.astronaut);
  return (
    <ListItem key={astronaut.id}>
      <Chip
        component="span"
        variant="outlined"
        startDecorator={<Emoji name="astronaut" />}
        componentsProps={{
          action: {
            component: Link,
            href: CREATE_ASTRONAUT_DETAIL_LINK(astronaut.id),
          },
        }}
      >
        {astronaut.firstName} {astronaut.lastName}
      </Chip>
    </ListItem>
  );
};

export const AstronautDetail: FunctionComponent<{
  astronaut: FragmentType<typeof AstronautDetailsFragmentDoc>;
}> = (props) => {
  const astronaut = useFragment(AstronautDetailsFragmentDoc, props.astronaut);

  return (
    <Typography component="h1">
      {astronaut.firstName} {astronaut.lastName}
    </Typography>
  );
};
