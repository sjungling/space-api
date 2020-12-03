import React, { FunctionComponent, MouseEvent, useState } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import {
  useFindAllMissionsQuery,
  Astronaut as TAstronaut,
  Mission as TMission,
  Scalars,
} from "./generated/graphql";
import "./styles.css";
import { apolloClient } from "./apollo-client";

type FormatDateOptions = {
  weekday?: "narrow" | "short" | "long";
  era?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";

  // Time zone to express it in
  timeZone?: string;
  // Force 12-hour or 24-hour
  hour12?: boolean;
};

const formatISODate = (date: Scalars["DateTime"]): string => {
  return new Date(date).toISOString();
};
const formatLaunchDate = (
  launchDate: Scalars["DateTime"],
  formatOptions?: FormatDateOptions
): string => {
  const stringifiedDate = new Date(launchDate);
  return new Intl.DateTimeFormat("en-US", formatOptions ?? undefined).format(
    stringifiedDate
  );
};

const Astronauts: FunctionComponent<{ crew: TAstronaut[] }> = ({ crew }) => {
  const astronauts = crew.map((astronaut) => (
    <Astronaut
      id={astronaut.id}
      firstName={astronaut.firstName}
      lastName={astronaut.lastName}
    />
  ));
  return <ul className="list-disc mr-8">{astronauts}</ul>;
};
const Astronaut: FunctionComponent<TAstronaut> = ({
  id,
  firstName,
  lastName,
}) => {
  return (
    <li key={id}>
      {lastName}, {firstName}
    </li>
  );
};
const MissionVehicles: FunctionComponent<
  Pick<TMission, "launchVehicle" | "commandModule" | "lunarModule">
> = ({ launchVehicle, commandModule, lunarModule }) => (
  <div>
    <span>
      Flew <strong>{launchVehicle}</strong> into space
    </span>{" "}
    {commandModule && (
      <span>
        commanding <strong>{commandModule}</strong>
      </span>
    )}{" "}
    {lunarModule && (
      <span>
        and landing on the 🌖 with <strong>{lunarModule}</strong>
      </span>
    )}
  </div>
);
const Mission: FunctionComponent<TMission> = ({
  id,
  mission,
  astronauts,
  launchDate,
  commandModule,
  launchVehicle,
  lunarModule,
  notes,
}) => {
  const launchDateFormat: FormatDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const launchDateTimeFormat: FormatDateOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "long",
  };
  const [noteVisibility, setNoteVisibility] = useState(false);
  const toggleNotes = (event: MouseEvent<HTMLButtonElement>) => {
    setNoteVisibility(!noteVisibility);
  };

  return (
    <div key={id} className="ring-2 p-1 dark:bg-opacity-25 dark:bg-indigo-600">
      <h2 className="text-center">{mission}</h2>
      <p>
        Launched on:{" "}
        <time dateTime={formatISODate(launchDate)}>
          {formatLaunchDate(launchDate, launchDateFormat)} at{" "}
          {formatLaunchDate(launchDate, launchDateTimeFormat)}
        </time>
      </p>
      <p>
        <MissionVehicles
          launchVehicle={launchVehicle}
          commandModule={commandModule}
          lunarModule={lunarModule}
        />
      </p>
      <Astronauts crew={astronauts} />
      <button onClick={toggleNotes}>
        {noteVisibility ? "Hide" : "See"} notes
      </button>
      <p className={noteVisibility ? null : "invisible"}>{notes}</p>
    </div>
  );
};
const Loading: FunctionComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="container animate-pulse w-1 h-1 text-9xl">🚀</div>
  </div>
);
const Missions: FunctionComponent = () => {
  const { data, loading, error } = useFindAllMissionsQuery();
  if (error) return <h1>Error fetching</h1>;
  if (loading) return <Loading />;
  const missionList = data.missions?.map((mission) => {
    return <Mission {...mission} />;
  });
  return (
    <div className="grid grid-cols-1  gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {missionList}
    </div>
  );
};

const App: FunctionComponent = () => (
  <>
    <header>
      <h1>Spaceify!</h1>
    </header>
    <main>
      <ApolloProvider client={apolloClient}>
        <Missions />
      </ApolloProvider>
    </main>
    <footer>Made in California</footer>
  </>
);

render(<App />, document.getElementById("root"));
