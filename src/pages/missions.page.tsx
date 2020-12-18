import React, { FunctionComponent } from "react";
import { MissionCard } from "../components/missions/missions.component";
import { LoadingComponent } from "../components/common";
import { useFindAllMissionsForNavQuery } from "../generated/graphql";
import { PageWrapper } from "./page-wrapper.component";

const MissionsPage: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsForNavQuery();
  if (error) {
    console.error(error);
    return (
      <h1>
        Failure to Launch{" "}
        <span role="img" aria-label="moon">
          🤕
        </span>
      </h1>
    );
  }
  if (loading) return <LoadingComponent />;
  const missionList = data?.missions
    ?.map((mission) => {
      if (mission && mission.__typename === "Mission") {
        return (
          <MissionCard
            key={mission.id}
            id={mission.id}
            mission={mission.mission}
          />
        );
      }
    })
    .filter(Boolean);
  return (
    <PageWrapper title="Manned Apollo Missions">
      <div className="grid grid-cols-1  gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {missionList}
      </div>
    </PageWrapper>
  );
};

export default MissionsPage;
