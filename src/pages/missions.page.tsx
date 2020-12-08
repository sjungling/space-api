import React, { FunctionComponent } from "react";
import { MissionCard } from "../components/missions/missions.component";
import { LoadingComponent } from "../components/common";
import { useFindAllMissionsQuery } from "../generated/graphql";

const MissionsPage: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsQuery();
  if (error) {
    console.error(error);
    return <h1>Failure to Launch 🤕</h1>;
  }
  if (loading) return <LoadingComponent />;
  const missionList = data.missions?.map(
    ({ id, mission, launchDate, media }) => {
      return (
        <MissionCard
          key={id}
          id={id}
          mission={mission}
          launchDate={launchDate}
          media={media}
        />
      );
    }
  );
  return (
    <div className="grid grid-cols-1  gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {missionList}
    </div>
  );
};

export default MissionsPage;
