import React, { FunctionComponent } from "react";
import { Astronaut as TAstronaut } from "../../generated/graphql";

export const Astronauts: FunctionComponent<{ crew: TAstronaut[] }> = ({
  crew,
}) => {
  const astronauts = crew.map((astronaut) => (
    <Astronaut
      id={astronaut.id}
      firstName={astronaut.firstName}
      lastName={astronaut.lastName}
    />
  ));
  return <ul className="list-disc mr-8">{astronauts}</ul>;
};
export const Astronaut: FunctionComponent<TAstronaut> = ({
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
