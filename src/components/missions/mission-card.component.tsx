import { Card, CardContent, Typography, Link } from "@mui/joy";
import { FunctionComponent } from "react";
import { CREATE_MISSION_DETAIL_LINK } from "../../constants/routes";
import { Mission } from "../../generated/gql/graphql";

export const MissionCardComponent: FunctionComponent<
  Pick<Mission, "mission" | "id">
> = ({ id, mission }) => {
  return (
    <Card variant="soft">
      <CardContent>
        <Typography component="h2">
          <Link href={CREATE_MISSION_DETAIL_LINK(id)}>{mission}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};
