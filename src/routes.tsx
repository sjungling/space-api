import React, { FunctionComponent, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Loading } from "./components/common/loading.component";
const AboutPage = lazy(() => import("./pages/about.page"));
const MissionsPage = lazy(() => import("./pages/missions.page"));

export const SpaceRouter: FunctionComponent = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={MissionsPage} />
      </Switch>
    </Suspense>
  </Router>
);
