import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { NotFound, useFindMissionByIdQuery } from "../generated/graphql";
import { LoadingComponent } from "../components/common";
import { MissionDetails } from "../components/missions/missions.component";

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
      <React.Fragment>
        <MissionDetails {...data.mission} />
      </React.Fragment>
    );
  }
};

export default MissionPage;
