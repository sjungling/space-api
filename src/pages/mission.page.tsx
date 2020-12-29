import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import {
  TNotFound,
  useFindMissionByIdQuery,
  useMissionImageGalleryQuery,
} from "../generated/graphql";
import { LoadingComponent } from "../components/common";
import {
  Gallery,
  MissionDetails,
} from "../components/missions/missions.component";
import { PageWrapper } from "./page-wrapper.component";

const MissionPage: FunctionComponent = () => {
  const { mission_id } = useParams<{ mission_id: string }>();
  const { data, loading, error } = useFindMissionByIdQuery({
    variables: {
      mission_id: Number(mission_id),
    },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <LoadingComponent />;
  if (error || data?.mission.__typename === "NotFound") {
    return (
      <>
        <p>{(data?.mission as TNotFound)!.message}</p>
      </>
    );
  }
  if (data && data.mission.__typename === "Mission") {
    const { mission } = data.mission;
    return (
      <PageWrapper
        title={mission}
        description={`Facts, images, and random information about ${mission}`}
      >
        <div className="ring-nasaRed ring-2 p-1 dark:bg-opacity-25 dark:bg-nasaBlue">
          <MissionDetails {...data.mission} />
          <MissionGallery id={Number(mission_id)} />
        </div>
      </PageWrapper>
    );
  }
  // Fallback
  return null;
};

const MissionGallery: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data, loading, error } = useMissionImageGalleryQuery({
    variables: {
      mission_id: Number(id),
    },
    returnPartialData: true,
  });

  if (!error) {
    return (
      <div>
        <h3>Gallery</h3>
        <Gallery images={data?.mission.images} usePlaceholder={loading} />
      </div>
    );
  }
  return null;
};

export default MissionPage;
