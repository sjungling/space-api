import React, { FunctionComponent } from "react";
import Link from "next/link";
import { CREATE_ASTRONAUT_DETAIL_LINK } from "../../constants/routes";
import {
  Astronaut,
  AstronautDetailsFragment,
} from "../../generated/apollo-hooks";
import { Emoji } from "../utilities/emoji.component";

export const AstronautCardComponent: FunctionComponent<
  AstronautDetailsFragment
> = ({ id, firstName, lastName }) => {
  return (
    <div key={id} className="astronaut-card">
      <h4>
        <Emoji name="astronaut" />
        {firstName} {lastName}
      </h4>
    </div>
  );
};
export const AstronautsComponent: FunctionComponent<{ crew: Astronaut[] }> = ({
  crew,
}) => {
  const astronauts = crew.map(({ id, firstName, lastName }) => (
    <AstronautComponent
      key={id}
      id={id}
      firstName={firstName}
      lastName={lastName}
    />
  ));
  return <ul className="mr-10">{astronauts}</ul>;
};
export const AstronautComponent: FunctionComponent<
  Pick<Astronaut, "id" | "firstName" | "lastName">
> = ({ id, firstName, lastName }) => {
  return (
    <li key={id}>
      <Link href={CREATE_ASTRONAUT_DETAIL_LINK(id)}>
        {lastName}, {firstName}
      </Link>
    </li>
  );
};

export const AstronautDetail: FunctionComponent<AstronautDetailsFragment> = ({
  firstName,
  lastName,
}) => (
  <React.Fragment>
    <h1>
      {firstName} {lastName}
    </h1>
  </React.Fragment>
);
