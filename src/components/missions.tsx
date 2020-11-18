import React, { FunctionComponent } from "react";
import {
  Astronaut,
  Mission,
  useAllMissionsAndAstronautsQuery,
} from "../__generated__/graphql-client-hooks";

const CrewDetails: FunctionComponent<Astronaut> = ({
  id,
  firstName,
  lastName,
}) => (
  <li key={id}>
    {lastName}, {firstName}
  </li>
);
const MissionDetails: FunctionComponent<{
  mission: Mission["mission"];
  launchDate: Mission["launchDate"];
  astronauts: Astronaut[];
}> = ({ mission, launchDate, astronauts }) => {
  const crew = astronauts.map(({ id, firstName, lastName }) => (
    <CrewDetails id={id} firstName={firstName} lastName={lastName} />
  ));
  return (
    <li key={mission}>
      {mission} on {launchDate}
      <ul>{crew}</ul>
    </li>
  );
};
export const MissionComponent: FunctionComponent = () => {
  const { data, loading, error } = useAllMissionsAndAstronautsQuery();
  if (error)
    return (
      <>
        <h1>Error</h1>
        {error.message}
      </>
    );
  if (loading) return <pre>Fetching</pre>;
  return (
    <div>
      <h2>Apollo Mission 🚀</h2>
      <ul>
        {data.missions.map(({ mission, launchDate, astronauts }) => (
          <MissionDetails
            mission={mission}
            launchDate={launchDate}
            astronauts={astronauts}
          />
        ))}
      </ul>
    </div>
  );
};
