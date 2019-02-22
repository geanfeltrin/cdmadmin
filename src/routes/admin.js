import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import store from "../store";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth.signedIn &&
      store.getState().auth.permisson === ["administrator"] ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default AdminRoute;
