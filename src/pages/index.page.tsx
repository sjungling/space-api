import React, { FunctionComponent } from "react";
import { MissionCardComponent } from "../components/missions/mission-card.component";
import { PageWrapper } from "../components/utilities/page-wrapper.component";
import { Grid } from "@mui/joy";
import { QueryResult } from "../components/utilities/query-results.component";
import { useQuery } from "@apollo/client";
import { FindAllMissionsForNavDocument } from "../generated/gql/graphql";

const MissionsPage: FunctionComponent = () => {
  const { data, loading, error } = useQuery(FindAllMissionsForNavDocument);
  return (
    <PageWrapper title="Manned Apollo Missions">
      <QueryResult data={data} loading={loading} error={error}>
        <Grid container rowGap={2} columnGap={1} spacing={1}>
          {data?.missions
            ?.filter((mission) => mission?.__typename === "Mission")
            .filter(Boolean)
            .map(({ id, mission }) => (
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
