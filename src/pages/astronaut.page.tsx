import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { AstronautDetail } from "../components/astronauts/astronauts.component";
import { LoadingComponent } from "../components/common";
import { NotFound, useFindAstronautByIdQuery } from "../generated/graphql";
import { PageWrapper } from "./page-wrapper.component";

const AstronautPage: FunctionComponent = () => {
  const { astronaut_id } = useParams<{ astronaut_id: string }>();

  const { data, loading, error } = useFindAstronautByIdQuery({
    variables: {
      astronaut_id: Number(astronaut_id),
    },
  });

  if (loading) return <LoadingComponent />;
  if (error || data.astronaut.__typename === "NotFound") {
    return (
      <>
        <p>{(data.astronaut as NotFound)!.message}</p>
      </>
    );
  }
  if (data && data.astronaut.__typename === "Astronaut") {
    return (
      <PageWrapper
        title={`${data.astronaut.firstName} ${data.astronaut.lastName}`}
      >
        <AstronautDetail {...data.astronaut} />
      </PageWrapper>
    );
  }
};

export default AstronautPage;
