import React, { FunctionComponent } from "react";
import { PageWrapper } from "../../components/utilities/page-wrapper.component";
import { useRouter } from "next/router";
import { Alert } from "@mui/joy";
import { QueryResult } from "../../components/utilities/query-results.component";
import { MissionGallery } from "../../components/missions/gallery.component";
import { MissionDetailsComponent } from "../../components/missions/details.component";
import { useQuery } from "@apollo/client";
import {
  FindMissionByIdDocument,
  MissionDetailsFragmentDoc,
} from "../../generated/gql/graphql";
import { useFragment } from "../../generated/gql";

const MissionPage: FunctionComponent = () => {
  const router = useRouter();
  const { missionId } = router.query;

  const { data, loading, error } = useQuery(FindMissionByIdDocument, {
    variables: {
      missionId: Number(missionId),
    },
  });

  const mission = useFragment(
    MissionDetailsFragmentDoc,
    data?.mission.__typename === "Mission" ? data?.mission : null
  );

  if (data?.mission.__typename === "NotFound") {
    return (
      <QueryResult data={data} loading={loading} error={error}>
        <PageWrapper title="Mission not found">
          <Alert color="warning" variant="soft">
            Unable to find mission
          </Alert>
        </PageWrapper>
      </QueryResult>
    );
  } else {
    return (
      <QueryResult data={data} loading={loading} error={error}>
        <PageWrapper
          title={mission?.mission}
          description={`Facts, images, and random information about ${data?.mission}`}
        >
          <MissionDetailsComponent
            missionDetails={data?.mission}
            astronautDetails={data?.mission}
          />
          <MissionGallery id={Number(missionId)} />
        </PageWrapper>
      </QueryResult>
    );
  }
};

export default MissionPage;
