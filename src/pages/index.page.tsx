import React, { FunctionComponent } from "react";
import { MissionCardComponent } from "../components/missions/missions.component";
import { LoadingComponent } from "../components/common";
import {
  Mission,
  useFindAllMissionsForNavQuery,
} from "../generated/apollo-hooks";
import { PageWrapper } from "./page-wrapper.component";
import { Emoji } from "../components/utilities/emoji.component";

const MissionsPage: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsForNavQuery();
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <h1>
        Failure to Launch <Emoji name="moon" />
      </h1>
    );
  }
  if (loading) return <LoadingComponent />;
  return (
    <PageWrapper title="Manned Apollo Missions">
      <div className="grid grid-cols-1  gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {data?.missions
          ?.filter((mission) => mission?.__typename === "Mission")
          .filter(Boolean)
          .map(({ id, mission }: Mission) => (
            <MissionCardComponent key={id} id={id} mission={mission} />
          ))}
      </div>
    </PageWrapper>
  );
};

export default MissionsPage;
