import React, { FunctionComponent } from "react";
import { AstronautDetail } from "../../components/astronauts/astronauts.component";
import { useFindAstronautByIdQuery } from "../../generated/apollo-hooks";
import { PageWrapper } from "../../components/utilities/page-wrapper.component";
import { useRouter } from "next/router";
import { QueryResult } from "../../components/utilities/query-results.component";
import { Alert } from "@mui/joy";

const AstronautPage: FunctionComponent = () => {
  const { query } = useRouter();

  const { data, loading, error } = useFindAstronautByIdQuery({
    variables: {
      astronaut_id: Number(query.astronaut),
    },
  });

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
      <PageWrapper
        title={`${data?.astronaut?.firstName} ${data?.astronaut?.lastName}`}
      >
        <AstronautDetail astronaut={data?.astronaut} />
      </PageWrapper>
    </QueryResult>
  );
};

export default AstronautPage;
