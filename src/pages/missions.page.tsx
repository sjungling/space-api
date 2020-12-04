import React, { FunctionComponent } from "react";
import { Missions } from "../components/missions/missions.component";
import { Link } from "react-router-dom";
import { ABOUT_PAGE_LINK } from "../constants/routes";

const MissionsPage: FunctionComponent = () => (
  <React.Fragment>
    <Link to={ABOUT_PAGE_LINK}>About this</Link>
    <Missions />
  </React.Fragment>
);

export default MissionsPage;
