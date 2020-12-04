import React, { FunctionComponent } from "react";
import { Missions } from "../components/missions/missions.component";
import { Link } from "react-router-dom";

const MissionsPage: FunctionComponent = () => (
  <React.Fragment>
    <Link to="/about">About this</Link>
    <Missions />
  </React.Fragment>
);

export default MissionsPage;
