import React, { FunctionComponent } from "react";
import { AstronautDetail } from "../../components/astronauts/astronauts.component";
import { PageWrapper } from "../../components/utilities/page-wrapper.component";
import { useRouter } from "next/router";
import { QueryResult } from "../../components/utilities/query-results.component";
import { Alert } from "@mui/joy";
import {
  AstronautDetailsFragmentDoc,
  FindAstronautByIdDocument,
} from "../../generated/gql/graphql";
import { useQuery } from "@apollo/client";
import { useFragment } from "../../generated/gql";

const AstronautPage: FunctionComponent = () => {
  const { query } = useRouter();

  const { data, loading, error } = useQuery(FindAstronautByIdDocument, {
    variables: {
      astronaut_id: Number(query.astronaut),
    },
  });

  const astronaut = useFragment(
    AstronautDetailsFragmentDoc,
    data?.astronaut.__typename === "Astronaut" ? data?.astronaut : null
  );

  return data?.astronaut?.__typename === "NotFound" ? (
    <QueryResult data={data} loading={loading} error={error}>
      <PageWrapper title="Not found">
        <Alert color="warning" variant="soft">
          Astronaut not found
        </Alert>
      </PageWrapper>
    </QueryResult>
  ) : (
    <QueryResult data={data} loading={loading} error={error}>
      <PageWrapper title={`${astronaut?.firstName} ${astronaut?.lastName}`}>
        <AstronautDetail astronaut={data?.astronaut} />
      </PageWrapper>
    </QueryResult>
  );
};

export default AstronautPage;
