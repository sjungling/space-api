import React, { FunctionComponent } from "react";
import {
  NotFound,
  useFindMissionByIdQuery,
  useMissionImageGalleryQuery,
} from "../../generated/apollo-hooks";
import { LoadingComponent } from "../../components/common";
import {
  GalleryComponent,
  MissionDetailsComponent,
} from "../../components/missions/missions.component";
import { PageWrapper } from "../page-wrapper.component";
import { useRouter } from "next/router";

const MissionPage: FunctionComponent = () => {
  const router = useRouter();
  const { missionId } = router.query;

  const { data, loading, error } = useFindMissionByIdQuery({
    variables: {
      missionId: Number(missionId),
    },
  });
  if (loading) return <LoadingComponent />;
  if (error || data?.mission.__typename === "NotFound") {
    return (
      <>
        <p>{(data?.mission as NotFound)!.message}</p>
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
          <MissionDetailsComponent {...data.mission} />
          <MissionGallery id={Number(missionId)} />
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
      missionId: Number(id),
    },
    returnPartialData: true,
  });

  if (!error) {
    return (
      <div>
        <h3>Gallery</h3>
        {loading && <GalleryComponent usePlaceholder={loading} />}
        {data?.mission.__typename === "Mission" && (
          <GalleryComponent images={data.mission.images} />
        )}
      </div>
    );
  }
  return null;
};

export default MissionPage;
