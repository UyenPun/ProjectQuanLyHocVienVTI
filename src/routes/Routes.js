import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  dashboard as dashboardRoutes,
  authRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

import { selectUserInfo } from "../redux/selectors/LoginSelector";

// check role
export const isShowForUserByRole = (roles, userRole) => {
  if (!roles || roles.length === 0) {
    return true;
  }

  // check role
  for (const role of roles) {
    if (role === userRole) {
      return true;
    }
  }

  return false;
}

const renderRoute = (index, route, Layout) => {

  const Component = route.component;

  return (
    <Route
      key={index}
      path={route.path}
      exact
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

const renderChildRoutes = (Layout, routes) =>
  routes.map((route, index) =>

    route.children ?
      // Route item with children
      route.children.map((childRoute, index) => renderRoute(index, childRoute, Layout))

      // Route item without children
      : renderRoute(index, route, Layout)
  );

const Routes = (props) => (
  <Router>
    <ScrollToTop>
      <Switch>
        {renderChildRoutes(DashboardLayout, dashboardRoutes.filter(route => isShowForUserByRole(route.roles, props.userInfo.role)))}
        {renderChildRoutes(AuthLayout, [authRoutes])}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

const mapGlobalStateToProps = state => {
  return {
    userInfo: selectUserInfo(state)
  };
};

export default connect(mapGlobalStateToProps)(Routes);
