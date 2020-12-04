import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { HOME_PAGE_LINK } from "../constants/routes";
const AboutPage: FunctionComponent = () => (
  <div>
    <h2>About this site</h2>
    <Link to={HOME_PAGE_LINK}>Return to home</Link>
  </div>
);
export default AboutPage;
