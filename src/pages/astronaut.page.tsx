import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { AstronautDetail } from "../components/astronauts/astronauts.component";
import { LoadingComponent } from "../components/common";
import { NotFound, useFindAstronautByIdQuery } from "../generated/graphql";

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
      <React.Fragment>
        <AstronautDetail {...data.astronaut} />
      </React.Fragment>
    );
  }
};

export default AstronautPage;
