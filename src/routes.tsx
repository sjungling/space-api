import React, { FunctionComponent, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoadingComponent,
  HeaderComponent,
  FooterComponent,
} from "./components/common";
import {
  ABOUT_PAGE_LINK,
  HOME_PAGE_LINK,
  MISSION_DETAIL_LINK,
} from "./constants/routes";

const routes = [
  {
    path: ABOUT_PAGE_LINK,
    component: lazy(
      () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "about" */ "./pages/about.page"
        )
    ),
  },
  {
    path: MISSION_DETAIL_LINK,
    component: lazy(
      () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "mission-details" */ "./pages/mission.page"
        )
    ),
  },
  {
    path: HOME_PAGE_LINK,
    exact: true,
    component: lazy(
      () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "missions" */ "./pages/missions.page"
        )
    ),
  },
];

export const SpaceRouter: FunctionComponent = () => (
  <>
    <Router>
      <HeaderComponent />
      <main>
        <Suspense fallback={<LoadingComponent />}>
          <Switch>
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </Switch>
        </Suspense>
      </main>
      <FooterComponent />
    </Router>
  </>
);
