import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { NotFound, useFindMissionByIdQuery } from "../generated/graphql";
import { LoadingComponent } from "../components/common";
import { MissionDetails } from "../components/missions/missions.component";
import { PageWrapper } from "./page-wrapper.component";

const MissionPage: FunctionComponent = () => {
  const { mission_id } = useParams<{ mission_id: string }>();
  const { data, loading, error } = useFindMissionByIdQuery({
    variables: {
      mission_id: Number(mission_id),
    },
  });

  if (loading) return <LoadingComponent />;
  if (error || data.mission.__typename === "NotFound") {
    return (
      <>
        <p>{(data.mission as NotFound)!.message}</p>
      </>
    );
  }
  if (data && data.mission.__typename === "Mission") {
    return (
      <PageWrapper
        title={data.mission.mission}
        description={`Facts, images, and random information about ${data.mission.mission}`}
      >
        <MissionDetails {...data.mission} />
      </PageWrapper>
    );
  }
};

export default MissionPage;
