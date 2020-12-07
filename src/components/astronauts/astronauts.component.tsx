import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CREATE_ASTRONAUT_DETAIL_LINK } from "../../constants/routes";
import { Astronaut as TAstronaut } from "../../generated/graphql";

export const Astronauts: FunctionComponent<{ crew: TAstronaut[] }> = ({
  crew,
}) => {
  const astronauts = crew.map((astronaut) => (
    <Astronaut
      key={astronaut.id}
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
      <Link to={CREATE_ASTRONAUT_DETAIL_LINK(id)}>
        {lastName}, {firstName}
      </Link>
    </li>
  );
};

export const AstronautDetail: FunctionComponent<TAstronaut> = ({
  firstName,
  lastName,
}) => (
  <React.Fragment>
    <h1>
      {firstName} {lastName}
    </h1>
  </React.Fragment>
);
