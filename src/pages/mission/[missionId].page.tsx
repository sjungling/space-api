import React, { FunctionComponent } from "react";
import { PageWrapper } from "../../components/utilities/page-wrapper.component";
import { useRouter } from "next/router";
import { Alert } from "@mui/joy";
import { QueryResult } from "../../components/utilities/query-results.component";
import { MissionGallery } from "../../components/missions/gallery.component";
import { useFindMissionByIdQuery } from "../../generated/apollo-hooks";
import { MissionDetailsComponent } from "../../components/missions/details.component";

const MissionPage: FunctionComponent = () => {
  const router = useRouter();
  const { missionId } = router.query;

  const { data, loading, error } = useFindMissionByIdQuery({
    variables: {
      missionId: Number(missionId),
    },
  });
  return data?.mission.__typename === "NotFound" ? (
    <QueryResult data={data} loading={loading} error={error}>
      <PageWrapper title="Mission not found">
        <Alert color="warning" variant="soft">
          Unable to find mission
        </Alert>
      </PageWrapper>
    </QueryResult>
  ) : (
    <QueryResult data={data} loading={loading} error={error}>
      <PageWrapper
        title={data?.mission.mission}
        description={`Facts, images, and random information about ${data?.mission}`}
      >
        <MissionDetailsComponent missionDetails={data?.mission} />
        <MissionGallery id={Number(missionId)} />
      </PageWrapper>
    </QueryResult>
  );
};

export default MissionPage;
