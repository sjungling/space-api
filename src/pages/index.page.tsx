import React, { FunctionComponent } from "react";
import { MissionCardComponent } from "../components/missions/mission-card.component";
import {
  Mission,
  useFindAllMissionsForNavQuery,
} from "../generated/apollo-hooks";
import { PageWrapper } from "../components/utilities/page-wrapper.component";
import { Grid } from "@mui/joy";
import { QueryResult } from "../components/utilities/query-results.component";

const MissionsPage: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsForNavQuery();
  return (
    <PageWrapper title="Manned Apollo Missions">
      <QueryResult data={data} loading={loading} error={error}>
        <Grid container rowGap={2} columnGap={1} spacing={1}>
          {data?.missions
            ?.filter((mission) => mission?.__typename === "Mission")
            .filter(Boolean)
            .map(({ id, mission }: Mission) => (
              <Grid key={id}>
                <MissionCardComponent id={id} mission={mission} />
              </Grid>
            ))}
        </Grid>
      </QueryResult>
    </PageWrapper>
  );
};

export default MissionsPage;
