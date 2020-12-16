import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CREATE_ASTRONAUT_DETAIL_LINK } from "../../constants/routes";
import { Astronaut as TAstronaut } from "../../generated/graphql";

export const AstronautCard: FunctionComponent<TAstronaut> = ({
  id,
  firstName,
  lastName,
}) => {
  return (
    <div key={id} className="astronaut-card">
      <h4>
        {firstName} {lastName}
      </h4>
    </div>
  );
};
export const Astronauts: FunctionComponent<{ crew: TAstronaut[] }> = ({
  crew,
}) => {
  const astronauts = crew.map(({ id, firstName, lastName }) => (
    <Astronaut key={id} id={id} firstName={firstName} lastName={lastName} />
  ));
  return <ul className="mr-10">{astronauts}</ul>;
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
