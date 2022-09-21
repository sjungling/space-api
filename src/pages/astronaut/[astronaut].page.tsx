import React, { FunctionComponent } from "react";
import { AstronautDetail } from "../../components/astronauts/astronauts.component";
import { LoadingComponent } from "../../components/common";
import {
  NotFound,
  useFindAstronautByIdQuery,
} from "../../generated/apollo-hooks";
import { PageWrapper } from "../page-wrapper.component";
import { useRouter } from "next/router";

const AstronautPage: FunctionComponent = () => {
  const { query } = useRouter();

  const { data, loading, error } = useFindAstronautByIdQuery({
    variables: {
      astronaut_id: Number(query.astronaut),
    },
  });

  if (loading) return <LoadingComponent />;
  if (error || data?.astronaut.__typename === "NotFound") {
    return <p>{(data?.astronaut as NotFound)?.message}</p>;
  }
  if (data?.astronaut.__typename === "Astronaut") {
    const { firstName, lastName } = data.astronaut;
    return (
      <PageWrapper title={`${firstName} ${lastName}`}>
        <AstronautDetail {...data.astronaut} />
      </PageWrapper>
    );
  }
  return null;
};

export default AstronautPage;
